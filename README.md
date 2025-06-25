# Thesis Project: Optimizing the Alerts History Tab at TeamViewer

## Overview
This repository contains the code and documentation for my thesis project, which focuses on optimizing the performance of the Alerts History page in TeamViewer's codebase. The goal of this project was to enhance the speed and efficiency of the page by reducing the number of API calls and improving overall website performance.

The proposed solution demonstrates measurable improvements in load times and responsiveness, making the Alerts History tab more efficient for end users.

## Problem Statement
The original implementation of the Alerts History page relied on frequent API calls, leading to slower performance, especially under high data loads or concurrent user activity. This inefficiency impacted the user experience and increased server-side resource consumption.

## Proposed Solution
In my optimized version, I redesigned the codebase to:

- **Reduce API Calls**: Consolidated multiple API requests into fewer, more efficient calls by leveraging batch processing and local caching where applicable.
- **Fetch on Scroll Method**: Mainly applied the "fetch on scroll" technique to dynamically load data as the user scrolls, reducing initial load times and only fetching data when needed.
- **Enhance Performance**: Improved client-side rendering and data handling to minimize latency and boost responsiveness on the website.

The result is a faster, more scalable Alerts History page that maintains functionality while improving the user experience.

## Repository Structure
- `src/`: Contains the source code for the optimized Alerts History tab implementation.
- `docs/`: Includes additional documentation, such as diagrams or performance benchmarks (if applicable).
- `tests/`: Test cases to validate the performance improvements (if included).
- `README.md`: This file.

## How to Run
1. Clone the repository: git clone https://github.com/SMIITT22/thesis.git
2. Navigate to the `Alerts_History_tab` directory: cd thesis/Alerts_History_tab
3. Follow the setup instructions in the `src/` folder (e.g., install dependencies, configure environment).
4. Run the application locally to observe the optimized Alerts History page.

## Results
- **Fewer API Calls**: Reduced calls per page load (update with specific numbers if available).
- **Performance Gains**: Achieved 20% faster load times compared to the original implementation, largely due to the fetch on scroll method.
- **Scalability**: Better handling of large datasets and concurrent users with dynamic data loading.

For detailed performance benchmarks, refer to the `docs/` folder (if applicable).

## Link
Explore the code and files here: [Alerts History Tab Code](https://github.com/SMIITT22/thesis/tree/main/Alerts_History_tab)

## Acknowledgments
This project was developed as part of my thesis to propose a real-world solution for TeamViewer’s Alerts History page. Special thanks to my advisors and the TeamViewer team for their support and feedback.
