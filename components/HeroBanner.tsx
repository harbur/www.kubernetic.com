import DownloadButton from "./DownloadButton"

export default function HeroBanner() {
  return (
    <div className="py-12 bg-blue-600 hideout background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center pt-20 pb-48">
          <h3 className="mt-2 pt-40 text-3xl font-light text-white sm:text-5xl lg:text-6xl sm:leading-tight">The Kubernetes Desktop Client</h3>
          <p className="mt-4 pt-6 max-w-2xl text-2xl leading-7 text-white lg:mx-auto">Cluster management, simplified.</p>
          <div className="pt-16">
            <DownloadButton />
          </div>
        </div>
      </div>
    </div >
  )
}

