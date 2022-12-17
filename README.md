# ChatGPT Middleware
A very simple and dumb REST API for interaction with ChatGPT

Uses [chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api) for background operation.

## API
### GET /text
Sends a text to ChatGPT and returns the response.
#### Parameters
`q`: The query to be sent to ChatGPT

#### Response (Code 200) OK
```json
{
  "q": "Your Query",
  "result": "ChatGPTs Response"
}
```

#### Response (Code 500) ChatGPT Error
```json
{
  "message": "Reason why ChatGPT failed"
}
```

#### Response (Code 400) Bad Request
```json
{
  "message": "Reason why the request was malformed"
}
```