class LicenseServer {
    async createSession() {
        let response = await fetch(`https://kubernetic-license-server.pro.harbur.io/api/session`, {
            method: "post",
          })
          return await response.json()
    }
}
export default new LicenseServer()