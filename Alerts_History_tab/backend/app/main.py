from fastapi import FastAPI, Query
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
