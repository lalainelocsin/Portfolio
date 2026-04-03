import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, Html } from "@react-three/drei"
import { useRef, useEffect, useState } from "react"
import * as THREE from "three"

function NurseModel() {
  const model = useGLTF("/models/nurse-desk.glb")
  const ref = useRef()
  const { camera } = useThree()

  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const keys = useRef({})

  // 🔥 Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      })
    }

    const handleKeyDown = (e) => (keys.current[e.key] = true)
    const handleKeyUp = (e) => (keys.current[e.key] = false)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  // 🔥 FPS + animation loop
  useFrame((state, delta) => {
    if (!ref.current) return

    // 👀 head follow
    ref.current.rotation.y += (mouse.x * 0.5 - ref.current.rotation.y) * 0.05
    ref.current.rotation.x += (-mouse.y * 0.3 - ref.current.rotation.x) * 0.05

    // 🫧 floating
    ref.current.position.y = -1.2 + Math.sin(state.clock.elapsedTime) * 0.05

    // 🎮 FPS movement
    const speed = 3 * delta

    if (keys.current["w"]) camera.position.z -= speed
    if (keys.current["s"]) camera.position.z += speed
    if (keys.current["a"]) camera.position.x -= speed
    if (keys.current["d"]) camera.position.x += speed
  })

  return (
    <>
      <primitive
        ref={ref}
        object={model.scene}
        scale={1.2}
        position={[0, -1.2, 0]}
        onPointerOver={() => ref.current.scale.set(1.3, 1.3, 1.3)}
        onPointerOut={() => ref.current.scale.set(1.2, 1.2, 1.2)}
      />

      {/* 🔥 CLICKABLE UI (floating panel) */}
      <Html position={[1.5, 1, 0]} transform>
        <div style={{
          background: "rgba(0,0,0,0.7)",
          padding: "15px",
          borderRadius: "10px",
          color: "white",
          width: "220px",
          backdropFilter: "blur(10px)"
        }}>
          <h3>Healthcare VA</h3>
          <p style={{ fontSize: "12px" }}>
            Manage EMR, scheduling, and patient coordination efficiently.
          </p>

          <button
  onClick={() => window.open("mailto:work.lalainelocsin@gmail.com")}
  style={{
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    border: "none",
    borderRadius: "6px",
    background: "linear-gradient(135deg, #00ffd0, #00aaff)",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s"
  }}
  onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
>
  Contact Me
</button>
        </div>
      </Html>
    </>
  )
}

export default function ModelStage() {
  return (
    <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, 3, 2]} intensity={0.8} />

      <NurseModel />
    </Canvas>
  )
}
