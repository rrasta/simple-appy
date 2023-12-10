# Dependencies
- mongodb  (choc install mongodb)
- mongodb compass (https://downloads.mongodb.com/compass/mongosh-2.1.1-win32-x64.zip)
- postman 


# Simple API
This is simple HTTP server running on port `3000`

## endpoint `/items`
### GET /items
Return list of items
item is:
```json

```
### POST /items
Add new item
Payload:

```json
{
  "user": "John Doe",
  "title": "My title",
  "content": "My item content"
}
```
