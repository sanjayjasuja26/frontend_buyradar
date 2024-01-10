import FingerprintJS from '@fingerprintjs/fingerprintjs'

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load()

const generateFingerprint = async () => {
  // Get the visitor identifier when you need it.
  const fp = await fpPromise
  const result = await fp.get()

  // This is the visitor identifier:
  const visitorId = result.visitorId
  saveVisitorId(visitorId)
}

export const getVisiterId = () => {
  return localStorage.getItem("buyRadarVisitor")
}
const saveVisitorId = (visitorId: string) => {
  localStorage.setItem("buyRadarVisitor", visitorId)
}
export default generateFingerprint
