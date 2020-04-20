# Question & Answers
_Some questions that came up during the course with a short answer._

## Scalability
Node.js is not multithreaded. Anyway, with a well-tuned design, we can run multiple process, one per CPU, and we can balance the incoming traffic between them.  
Problems comes when we need to scale the database, where we need data consistency. In that case, some advanced solutions step in.
I would suggest to use a managed autoscaled db, with AWS, GCP, or other providers.
- [Good practices for high-performance and scalable Node.js applications](https://medium.com/iquii/good-practices-for-high-performance-and-scalable-node-js-applications-part-1-3-bb06b6204197)

## CI/CD
- Travis CI it's easier, but it's free only for public repository
- GitHub Actions are faster and free (with an execution time limit) also for private repo, but are a bit more complicated
- You can take inspiration from my repository [github.com/daquinoaldo/https-localhost](https://github.com/daquinoaldo/https-localhost/), where you can find a small server with some tests and both Travis CI and GitHub Actions

## WebSocket
This repository contains some very good examples.
- [github.com/websockets/ws](https://github.com/websockets/ws#external-https-server)

## OAuth
Take a look to this resources. For a basic authentication, JWT may be an easier approach.
- [Learn Authentication The Hard Way](https://www.andrew-best.com/posts/learn-auth-the-hard-way-part-one/)
- [What are the main differences between JWT and OAuth authentication?](https://stackoverflow.com/questions/39909419/what-are-the-main-differences-between-jwt-and-oauth-authentication)