import {
  Center,
  ContactShadows,
  Float,
  MeshDistortMaterial,
  RoundedBox,
  useScroll,
} from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import { useFrame } from "@react-three/fiber";
import { Star } from "./Star";
import { MacBookPro } from "./MacBookPro";
import { PalmTree } from "./PalmTree";
import * as THREE from "three";
import { config } from "../config";
import { BookCase } from "./BookCase";
import { CouchSmall } from "./CouchSmall";
import { Lamp } from "./Lamp";
import { Monitor } from "./Monitor";
import { ParkBench } from "./ParkBench";
import { Balloon } from "./Balloon";
import { Mailbox } from "./Mailbox";
import { Pigeon } from "./Pigeon";
import { motion } from "framer-motion-3d";
import MonitorScreen from "./MonitorScreen";
import useMobile from "../hooks/useMobile";
import { useAtom } from "jotai";
import { halloweenAtom } from "./Menu";
import { dampC } from "maath/easing";
import Effects from "./Effects";
import { HalloweenAvatar } from "./HalloweenAvatar";
import { Ghost } from "./Ghost";
import { TextBubble } from "./TextBubble";

const SECTIONS_DISTANCE = 10;

export const Experience = () => {
  const sceneContainer = useRef();
  const floorRef = useRef();
  const scrollData = useScroll();

  const [section, setSection] = useState(config.sections[0]);

  const { isMobile, scaleFactor } = useMobile();
  const [themeIcon] = useAtom(halloweenAtom);

  useFrame((_state, delta) => {
    if (isMobile) {
      sceneContainer.current.position.x =
        -scrollData.offset * SECTIONS_DISTANCE * (scrollData.pages - 1);
      sceneContainer.current.position.z = 0;
    } else {
      sceneContainer.current.position.z =
        -scrollData.offset * SECTIONS_DISTANCE * (scrollData.pages - 1);
      sceneContainer.current.position.x = 0;
    }
    setSection(
      config.sections[Math.round(scrollData.offset * (scrollData.pages - 1))]
    );

    // theme
    if (!floorRef.current) return;
    const currentColor = floorRef.current.material.color;
    dampC(currentColor, themeIcon ? "#0B021A" : "#f5f3ee", 0.1, delta);
  });

  useEffect(() => {
    window.location.href = `#home`;
    const handleHashChange = () => {
      const sectionIndex = config.sections.indexOf(
        window.location.hash.replace("#", "")
      );
      if (sectionIndex !== -1) {
        scrollData.el.scrollTo(
          0,
          (sectionIndex / (config.sections.length - 1)) *
            (scrollData.el.scrollHeight - scrollData.el.clientHeight)
        );
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      <Effects />
      <Avatar
        visible={!themeIcon}
        isMobile={isMobile}
        position-z={isMobile ? -5 : 0}
      />
      <HalloweenAvatar visible={themeIcon} />
      <ContactShadows
        opacity={themeIcon ? 0 : 0.5}
        scale={[30, 30]}
        color="#9c8e66"
      />
      <mesh ref={floorRef} position-y={-0.001} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#f5f3ee" />
      </mesh>

      <motion.group ref={sceneContainer} animate={section}>
        <motion.group
          position-y={-5}
          variants={{
            home: {
              y: 0,
            },
          }}
        >
          <Star
            position-y={2.2}
            scale={0.3}
            position-z={isMobile ? -5 : 0}
            visible={!themeIcon}
          />
          {themeIcon && (
            <Float
              speed={1.2}
              rotationIntensity={0}
              floatIntensity={2}
              floatingRange={[-0.04, 0.1]}
            >
              <Ghost
                position-y={2.2}
                scale={0.17}
                position-z={isMobile ? -5 : 0}
              />
              <TextBubble
                scale={0.25}
                position-y={2.2}
                position-z={isMobile ? -5 : 0}
                position-x={0.7}
              />
            </Float>
          )}
          <Float floatIntensity={2} speed={2}>
            <MacBookPro
              position-x={isMobile ? -0.5 : -1}
              position-y={isMobile ? 1 : 0.5}
              position-z={isMobile ? -2 : 0}
              scale={0.3}
              rotation-y={Math.PI / 4}
            />
          </Float>
          <PalmTree
            scale={0.018}
            rotation-y={THREE.MathUtils.degToRad(140)}
            position={isMobile ? [1, 0, -4] : [4 * scaleFactor, 0, -5]}
          />
          <group scale={isMobile ? 0.3 : 1}>
            <Float floatIntensity={0.6}>
              {/* need to disableY and Z centering if you want to change 3d objects y and z. Can do same for x axis */}
              <Center disableY disableZ>
                <SectionTitle
                  size={0.8}
                  position-y={1.6}
                  position-z={-3}
                  bevelEnabled
                  bevelThickness={0.3}
                  themeIcon={themeIcon}
                >
                  {config.home.title}
                </SectionTitle>
              </Center>
            </Float>
            <Center disableY disableZ>
              <SectionTitle
                size={1.2}
                position-x={-2.6}
                position-z={-3}
                bevelEnabled
                bevelThickness={0.3}
                rotation-y={Math.PI / 10}
                themeIcon={themeIcon}
              >
                {config.home.subtitle}
              </SectionTitle>
            </Center>
          </group>
        </motion.group>
        <motion.group
          position-x={isMobile ? SECTIONS_DISTANCE : 0}
          position-z={isMobile ? -4 : SECTIONS_DISTANCE}
          position-y={-5}
          variants={{
            skills: {
              y: 0,
            },
          }}
        >
          <group position-x={isMobile ? 0 : -2}>
            <SectionTitle position-z={1.5} rotation-y={Math.PI / 6}>
              SKILLS
            </SectionTitle>
            <BookCase position-z={-2} />
            <CouchSmall
              scale={0.4}
              position-z={0}
              position-x={-0.2}
              rotation-y={Math.PI / 3}
            />
            <Lamp position={[-0.4, -0.8, 0.6]} rotation-y={-Math.PI} />
          </group>
          <mesh position={[2, 2, -4]}>
            <sphereGeometry args={[1, 32, 32]} />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color="yellow"
            />
          </mesh>
        </motion.group>
        <motion.group
          position-x={isMobile ? 2 * SECTIONS_DISTANCE : 0}
          position-z={isMobile ? -4 : 2 * SECTIONS_DISTANCE}
          position-y={-5}
          variants={{
            projects: {
              y: 0,
            },
          }}
        >
          <group position-x={isMobile ? -0.25 : 1}>
            <SectionTitle
              position-x={-0.5}
              position-z={0}
              rotation-y={-Math.PI / 6}
            >
              PROJECTS
            </SectionTitle>
            <group
              position-x={0.5}
              position-z={0}
              rotation-y={-Math.PI / 6}
              scale={0.8}
            >
              <MonitorScreen
                rotation-x={-0.18}
                position-z={-0.895}
                position-y={1.74}
              />
              <Monitor
                scale={0.02}
                position-y={1}
                rotation-y={-Math.PI / 2}
                position-z={-1}
              />
              <RoundedBox scale-x={2} position-y={0.5} position-z={-1}>
                <meshStandardMaterial color="white" />
              </RoundedBox>
            </group>
          </group>
        </motion.group>
        <motion.group
          position-x={isMobile ? 3 * SECTIONS_DISTANCE : 0}
          position-z={isMobile ? -4 : 3 * SECTIONS_DISTANCE}
          position-y={-5}
          variants={{
            contact: {
              y: 0,
            },
          }}
        >
          <SectionTitle
            position-x={isMobile ? -1.1 : -2 * scaleFactor}
            position-z={0.6}
          >
            CONTACT
          </SectionTitle>
          <group position-x={-2 * scaleFactor}>
            <ParkBench
              scale={0.5}
              position-x={-0.5}
              position-z={-2.5}
              rotation-y={-Math.PI / 4}
            />
            <group position-y={2.2} position-z={-0.5}>
              <Float floatIntensity={2} rotationIntensity={1.5}>
                <Balloon scale={1.5} position-x={-0.5} color="#71a2d9" />
              </Float>
              <Float
                floatIntensity={1.5}
                rotationIntensity={2}
                position-z={0.5}
              >
                <Balloon scale={1.3} color="#d97183" />
              </Float>
              <Float speed={2} rotationIntensity={2}>
                <Balloon scale={1.6} position-x={0.4} color="yellow" />
              </Float>
            </group>
          </group>
          <Mailbox
            scale={0.25}
            rotation-y={1.25 * Math.PI}
            position={[1, 0.25, 0.5]}
          />
          <Float floatIntensity={1.5} speed={3}>
            <Pigeon
              position={[
                isMobile ? 0 : 2 * scaleFactor,
                isMobile ? 2.2 : 1.5,
                -0.5,
              ]}
              scale={0.3}
            />
          </Float>
        </motion.group>
      </motion.group>
    </>
  );
};
