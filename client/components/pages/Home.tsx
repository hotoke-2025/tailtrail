import MapComponent from '../map/MapComponent'

export default function HomePage() {
    return (
        <div className='home-page p-4'>
            <h1 className='text-2xl font-bold mb-4'>Welcome to TailTrail</h1>
            <div className='map-component'>
                <MapComponent />
            </div>
        </div>
    )
}