async function createSession(licenses: number, taxID: string, country: string) {
  let response = await fetch(`${process.env.NEXT_PUBLIC_LICENSESERVER_URL}/api/session` as string, {
    method: "post",
    body: JSON.stringify({
      licenses,
      taxID,
      country,
    })
  })
  if (!response.ok) {
    throw await response.json()
  }
  return await response.json()
}

export default { createSession }
