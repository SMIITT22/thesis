from fastapi import FastAPI, Query, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from uuid import UUID
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = "postgresql://postgres:2002@localhost:5432/alerts_db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

class Alert(BaseModel):
    alertId: UUID = Field(..., alias="alertid")
    checkData: dict = Field(..., alias="checkdata")
    details: str
    deviceName: str = Field(..., alias="devicename")
    foundAt: datetime = Field(..., alias="foundat")
    resolvedAt: Optional[datetime] = Field(None, alias="resolvedat")
    state: str
    teamviewerId: Optional[int] = Field(None, alias="teamviewerid")

class PaginatedResponse(BaseModel):
    items: List[Alert]
    nextPaginationToken: Optional[str]


@app.get("/alerts", response_model=PaginatedResponse)
async def get_alerts(
    totalLimit: int = Query(..., gt=0),
    limit: int = Query(200, gt=0, le=200),
    nextPaginationToken: Optional[str] = None,
):
    limit = min(limit, 200)

    offset = int(nextPaginationToken) if nextPaginationToken else 0

    query = """
        SELECT
            alertid, checkdata, details, devicename,
            foundat, resolvedat, state, teamviewerid
        FROM alerts
        LIMIT :limit OFFSET :offset
    """

    with engine.connect() as conn:
        result = conn.execute(text(query), {"limit": limit, "offset": offset}).fetchall()
        alerts = [dict(row._mapping) for row in result]

        totalFetched = offset + len(alerts)

        if len(alerts) == limit and totalFetched < totalLimit:
            new_token = str(totalFetched)
        else:
            new_token = None

        return PaginatedResponse(items=alerts, nextPaginationToken=new_token).dict(by_alias=True)

@app.get("/scrollable-alerts", response_model=PaginatedResponse)
async def get_scrollable_alerts(
    limit: int = Query(50, gt=0),
    paginationToken: Optional[str] = Query(None),
    sortColumn: Optional[str] = Query(None),
    sortOrder: Optional[str] = Query("asc"),
    totalLimit: Optional[int] = Query(None),
):
    limit = min(limit, 200)
    offset = int(paginationToken) if paginationToken else 0

    SORT_COLUMN_MAP = {
        "checkdata.type": "checkdata ->> 'type'",
        "state": "state",
        "details": "details",
        "devicename": "devicename",
        "foundat": "foundat",
        "resolvedat": "resolvedat",
        "teamviewerid": "teamviewerid",
    }

    if sortColumn and sortColumn not in SORT_COLUMN_MAP:
        raise HTTPException(status_code=400, detail="Invalid sort column")

    sort_query = (
        f"ORDER BY {SORT_COLUMN_MAP[sortColumn]} {sortOrder.upper()}" if sortColumn else ""
    )

    total_count_query = "SELECT COUNT(*) FROM alerts"
    with engine.connect() as conn:
        total_count = conn.execute(text(total_count_query)).scalar()

        query = f"""
            SELECT
                alertid, checkdata, details, devicename,
                foundat, resolvedat, state, teamviewerid
            FROM alerts
            {sort_query}
            LIMIT :limit OFFSET :offset
        """
        result = conn.execute(text(query), {"limit": limit, "offset": offset}).fetchall()
        alerts = [dict(row._mapping) for row in result]

        totalFetched = offset + len(alerts)

        if totalFetched < total_count and (not totalLimit or totalFetched < totalLimit):
            next_token = str(totalFetched)
        else:
            next_token = None

        return PaginatedResponse(items=alerts, nextPaginationToken=next_token).dict(by_alias=True)
