class LicenseServer {
  async createSession(licenses) {
    // TODO: URL should be parametrized to send requests on PRO or BETA environment
    let response = await fetch(`https://kubernetic-license-server-pro.pro.harbur.io/api/session`, {
      method: "post",
      body: JSON.stringify({
        licenses,
      })
    })
    return await response.json()
  }
}
export default new LicenseServer()
