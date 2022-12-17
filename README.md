# ChatGPT Middleware
A very simple and dumb REST API for interaction with ChatGPT

Uses [chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api) for background operation.

## Setup
- Move .env.example to .env
- Edit the contents of .env to your needs
- Run `yarn install`
- Run `yarn start`
- Follow the instructions of the Puppeteer Browser window that opens (eg. resolve Captcha)

### Important
If ChatGPT Servers are busy, the application can not be initialized. If that happens an error like this is thrown:

```
ChatGPTError: ChatGPT is at capacity
```

If that's the case you have to wait until ChatGPT is up again for the API to work.

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