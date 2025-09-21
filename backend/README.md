# Bus Tracking Backend

This Flask backend provides GPS tracking functionality for buses with the following endpoints:

## Endpoints

- `POST /track` - Store bus location data
- `GET /latest` - Get latest location data for all buses  
- `GET|POST /` - Traccar adapter for receiving GPS data

## Database Schema

SQLite database with `bus_locations` table:
- `bus_id` (TEXT) - Bus identifier
- `lat` (REAL) - Latitude
- `lon` (REAL) - Longitude  
- `timestamp` (INTEGER) - Unix timestamp

## Local Development

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
python app.py
```

Server runs on `http://localhost:5000`

## Deployment Options

### Option 1: Railway (Recommended)
1. Create account at [Railway.app](https://railway.app)
2. Connect your GitHub repo
3. Railway will auto-detect Python and deploy
4. Update `src/config/api.ts` with your Railway URL

### Option 2: Heroku
1. Install Heroku CLI
2. Create `Procfile`: `web: python app.py`
3. Deploy: `git push heroku main`

### Option 3: PythonAnywhere
1. Upload files to PythonAnywhere
2. Configure WSGI app
3. Update allowed hosts

## Frontend Integration

Update the API URL in `src/config/api.ts` with your deployed backend URL.