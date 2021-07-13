async function createSession(licenses: number, taxID: string, country: string) {
  let response = await fetch(`${process.env.NEXT_PUBLIC_LICENSESERVER_URL}` as string, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
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
