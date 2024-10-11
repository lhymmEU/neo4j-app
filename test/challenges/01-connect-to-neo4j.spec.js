// Task: Learn how to initiate the driver and verify connectivity
// Outcome: verifyConnectivity on the driver exported from /src/neo4j.js should return true

import { config } from 'dotenv'
import { closeDriver, getDriver, initDriver } from '../../src/neo4j.js'

describe('01. Initiate Driver', () => {
  beforeAll(() => config())
  afterAll(() => closeDriver())

  it('Should create a driver instance and connect to server', async () => {
    const {
      NEO4J_URI,
      NEO4J_USERNAME,
      NEO4J_PASSWORD,
    } = process.env

    console.log(`NEO4J_URI: ${NEO4J_URI}, NEO4J_USERNAME: ${NEO4J_USERNAME}, NEO4J_PASSWORD: ${NEO4J_PASSWORD}`);

    expect(NEO4J_URI).toBeDefined()
    expect(NEO4J_USERNAME).toBeDefined()
    expect(NEO4J_PASSWORD).toBeDefined()

    await initDriver(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD)
  })

  it('Driver has been instantiated', () => {
    const driver = getDriver()
    expect(driver).toBeDefined()

    expect(driver.constructor.name).toEqual('Driver')
  })

  it('Driver can verify connectivity', async () => {
    const driver = getDriver()
    expect(driver).toBeDefined()
    expect(driver.constructor.name).toEqual('Driver')

    // Use async/await to handle the connectivity verification
    try {
      await driver.verifyConnectivity()
      expect(true).toEqual(true)  // Connectivity verified successfully
    } catch (e) {
      console.error('Connectivity verification failed:', e)  // Log the error for better debugging
      expect(e).toBeUndefined()   // If an error occurs, this will fail the test
    }
  })
})
