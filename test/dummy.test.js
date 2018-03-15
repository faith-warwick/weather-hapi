import Server from '../src'

describe(`initial`, () => {


  let server
  beforeEach(async () => {
    server = await Server()
  })

  it(`has valid server`, async () => {
    const { statusCode } = await server.inject('/')
    expect(statusCode).to.equal(200)
  })
})
