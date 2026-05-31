# Memories Backend

Node.js, Express, MongoDB, and Mongoose API for storing event attendees and photo metadata.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Set `MONGODB_URI` to your local MongoDB or MongoDB Atlas connection string. `CLIENT_ORIGIN` accepts one or more comma-separated frontend origins.

## API

### Health

`GET /api/health`

### Attendees

`GET /api/attendees`

`POST /api/attendees`

```json
{
  "fullName": "John Doe",
  "nickname": "JD",
  "profileImageUrl": "https://example.com/john.jpg"
}
```

### Photos

`GET /api/photos?search=john&attendeeId=...`

`POST /api/photos`

```json
{
  "uploaderName": "John Doe",
  "attendeeId": "optional_mongodb_id",
  "imageUrl": "https://res.cloudinary.com/your-cloud/image/upload/memories/photo.jpg",
  "publicId": "memories/photo",
  "caption": "Dance floor",
  "tags": ["dance", "friends"]
}
```

`PATCH /api/photos/:id/like`

`DELETE /api/photos/:id`

This backend stores metadata only. The frontend should upload images to Cloudinary first, then send the returned `secure_url` and `public_id` to `POST /api/photos`.
