// MapComponent.tsx
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { usePets } from '../../hooks/usePets'
import type { Pet } from '../../../models/pet'
import LoadingPawprint from '../LoadingPaw.tsx'

interface MapComponentProps {
  filter: 'all' | 'lost' | 'found'
}

const containerStyle = { width: '100%', height: '500px' }
const defaultCenter = { lat: -36.8485, lng: 174.7633 } // Auckland fallback

export default function MapComponent({ filter }: MapComponentProps) {
  // Use the loader that worked for you previously
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })

  // Hook result (defensive)
  const hookResult: any = usePets()
  console.log('usePets() raw ->', hookResult)

  // Optional: quick override to test markers without the hook
  const [useTestData, setUseTestData] = useState(false)

  // Normalize hook output to an array
  const petsFromHook: Pet[] = useMemo(() => {
    if (useTestData) {
      return [
        {
          id: -1,
          ownerId: -1,
          species: 'dog',
          breed: 'test-breed',
          name: 'Test Pet',
          sex: 'unknown',
          desexed: false,
          colour: 'brown',
          age: 3,
          size: 'medium',
          microchipped: false,
          homeSuburb: 'Auckland',
          lastLocation: 'Queen St',
          lastSeenDate: new Date().toISOString(),
          photoUrl: '',
          lost: true,
          registrationNumber: 0,
          latitude: '-36.8485',
          longitude: '174.7633',
        } as Pet,
      ]
    }

    if (Array.isArray(hookResult)) return hookResult
    if (Array.isArray(hookResult?.data)) return hookResult.data
    if (Array.isArray(hookResult?.pets)) return hookResult.pets
    return []
  }, [hookResult, useTestData])

  const isLoading = hookResult?.isLoading ?? hookResult?.loading ?? false
  const error = hookResult?.error ?? null

  // Filter by lost/found/all
  const filteredPets = useMemo(
    () =>
      petsFromHook.filter((p) => {
        if (filter === 'all') return true
        if (filter === 'lost') return Boolean(p.lost)
        if (filter === 'found') return !p.lost
        return true
      }),
    [petsFromHook, filter],
  )

  // Parse & validate coordinates (replace comma with dot to help locales)
  const parsed = useMemo(() => {
    return filteredPets.map((p) => {
      const rawLat = (p.latitude ?? '').toString().trim()
      const rawLng = (p.longitude ?? '').toString().trim()
      // replace comma decimal separators if present
      const lat = parseFloat(rawLat.replace(',', '.'))
      const lng = parseFloat(rawLng.replace(',', '.'))
      const valid = !Number.isNaN(lat) && !Number.isNaN(lng)
      return { pet: p, lat, lng, rawLat, rawLng, valid }
    })
  }, [filteredPets])

  const validPins = parsed.filter((x) => x.valid)
  const invalidPins = parsed.filter((x) => !x.valid)

  // Fit bounds when map loads
  const mapRef = useRef<any>(null)
  const onMapLoad = useCallback(
    (map: any) => {
      mapRef.current = map
      if (!validPins.length) return
      try {
        const bounds = new window.google.maps.LatLngBounds()
        validPins.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }))
        map.fitBounds(bounds)
      } catch (err) {
        console.warn('Fit bounds failed:', err)
      }
    },
    [validPins],
  )

  // Render states
  if (isLoading) return <LoadingPawprint />
  if (error) return <div>Error loading pets: {String(error)}</div>
  if (loadError)
    return <div>Google Maps failed to load: {String(loadError)}</div>
  if (!isLoaded) return <LoadingPawprint />

  const initialCenter = validPins.length
    ? { lat: validPins[0].lat, lng: validPins[0].lng }
    : defaultCenter

  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          marginBottom: 8,
        }}
      >
        <button
          onClick={() => setUseTestData((s) => !s)}
          style={{ padding: '6px 10px' }}
        >
          {useTestData ? 'Use real data' : 'Show test marker'}
        </button>
        <div style={{ fontSize: 13 }}>
          Showing <strong>{filteredPets.length}</strong> pets — markers:{' '}
          <strong>{validPins.length}</strong> (invalid:{' '}
          <strong>{invalidPins.length}</strong>)
        </div>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={initialCenter}
        zoom={11}
        onLoad={onMapLoad}
      >
        {validPins.map((p) => (
          <Marker
            key={String(p.pet.id)}
            position={{ lat: p.lat, lng: p.lng }}
            title={p.pet.name || `Pet ${p.pet.id}`}
          />
        ))}
      </GoogleMap>

      {/* Debug output (helpful, remove in production) */}
      <div style={{ marginTop: 10, fontSize: 13 }}>
        <details>
          <summary style={{ cursor: 'pointer' }}>
            Debug info (click to expand)
          </summary>
          <div style={{ marginTop: 8 }}>
            <strong>Raw hook output:</strong>
            <pre
              style={{
                maxHeight: 200,
                overflow: 'auto',
                background: '#f7f7f7',
                padding: 8,
              }}
            >
              {JSON.stringify(hookResult, null, 2)}
            </pre>

            {invalidPins.length > 0 && (
              <>
                <strong>Invalid coords (these will be skipped):</strong>
                <pre style={{ background: '#fff0f0', padding: 8 }}>
                  {JSON.stringify(
                    invalidPins.map((i) => ({
                      id: i.pet.id,
                      lat: i.rawLat,
                      lng: i.rawLng,
                    })),
                    null,
                    2,
                  )}
                </pre>
              </>
            )}
          </div>
        </details>
      </div>
    </div>
  )
}
