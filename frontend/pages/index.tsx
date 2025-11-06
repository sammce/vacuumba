import {
  Button,
  Center,
  Heading,
  HStack,
  Text,
  VStack,
  SlideFade,
} from "@chakra-ui/react";

import { Parallax } from "react-parallax";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useRef } from "react";
import useMergedRefs from "../hooks/useMergedRef";
import Testimony from "../components/Testimony";
import ScrollArrow from "../components/ScrollArrow";
import classes from "./index.module.css";

import type { CenterProps } from "@chakra-ui/react";
import type { MotionProps } from "framer-motion";
import Link from "next/link";
import { useAuth } from "../context/auth";

// Merge the chakra-ui Center component with framer-motion.
const MotionCenter = motion(Center) as React.FC<MotionProps & CenterProps>;

// The animation definition for the parent node of the
// referrals
const parentAnimations = {
  visible: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.6,
    },
  },
};

const Home = () => {
  const { loggedIn } = useAuth();

  // When the element stored in the 'ref' is in the viewport, 'inView'
  // becomes true.
  const { ref: viewRef, inView } = useInView({ triggerOnce: true });

  const contentRef = useRef<HTMLDivElement>(null);

  // Combine viewRef and contentRef so that they can be used on one
  // element.
  const mergedContentRef = useMergedRefs([viewRef, contentRef]);

  return (
    <>
      <Parallax
        bgImage="/blob-scene.svg"
        className={classes.scene}
        strength={600}
        blur={{ min: -70, max: 70 }}
      >
        <SlideFade offsetY={40} in>
          <Center mt={{ base: "25vh", md: "30vh" }}>
            <VStack w={{ base: "90%", md: "50%" }} textAlign="center">
              <Heading
                fontSize={{ base: "5xl", md: "7xl" }}
                lineHeight="1.1em"
                fontWeight="bold"
                letterSpacing="-0.03em"
              >
                <Text color="primaryLight" as="span">
                  Never
                </Text>{" "}
                clean <br /> manually again
              </Heading>
              <Text>
                Our revolutionary robot technology will show you a side of home
                improvement you never thought you would experience.
              </Text>
              <HStack
                gap="1rem"
                w="full"
                flexDirection={{ base: "column", md: "row" }}
              >
                <Link href="/buy" passHref>
                  <Button width={{ base: "full", md: "60%" }} variant="primary">
                    Buy Vacuumba&copy;
                  </Button>
                </Link>
                <Link
                  href={loggedIn ? "/manage" : "/login?next=/manage"}
                  passHref
                >
                  <Button
                    width={{ base: "full", md: "35%" }}
                    style={{ margin: 0 }}
                  >
                    Manage your vacuum
                  </Button>
                </Link>
              </HStack>

              <ScrollArrow contentRef={contentRef} />
            </VStack>
          </Center>

          <VStack
            mt={{ base: "15vh", md: "30vh" }}
            gap="1rem"
            style={{ scrollMargin: "5rem" }}
            ref={mergedContentRef}
          >
            <Heading w="90%" textAlign="center">
              Listen to what our customers have to say
            </Heading>
            <MotionCenter
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={parentAnimations}
              flexDirection="column"
              gap="3rem"
            >
              <Testimony
                name="Janice"
                description="Retired nurse"
                imageUrl="/janice-pfp.jpg"
                heading="I can't live without it"
              >
                I am no longer able to use a normal vacuum because they&apos;re
                too heavy. The Vacuumba has taken the workload off my shoulders
                and relieved the back pain I was feeling from trying to hoover.
              </Testimony>
              <Testimony
                name="Cian"
                description="Prison inmate"
                imageUrl="/cian-pfp.jpg"
                heading="I wish I got one sooner"
              >
                Being in prison is a huge obstacle to cleaning my house, but
                with Vacuumba I am able to start hoovering from the infirmary
                computer. Technology has come a long way since my incarceration.
              </Testimony>
              <Testimony
                name="Warren"
                description="Blind"
                imageUrl="/warren-pfp.jpg"
                heading="It changed my life"
              >
                I often have trouble operating a traditional vacuum, but the
                Vacuumba helped automate my cleaning routine. The screen-reader
                interoperability of the website allows me to use the Vacuumba as
                if I had 20/20 vision.
              </Testimony>

              <Testimony
                name="Tadhg"
                description="Trains drug sniffing dogs"
                imageUrl="/tadhg-pfp.jpg"
                heading="One less problem to deal with"
              >
                The ability to let Vacuumba handle the what, when and how of
                hoovering has allowed me to focus on what matters to me. I only
                wish they offered more products!
              </Testimony>
              <Testimony
                name="Rachel"
                description="Single mother"
                imageUrl="/rachel-pfp.jpg"
                heading="Vacuumba vacuumed all my stress"
              >
                Most of my time nowadays is spent getting the kids ready for
                school, so not having to worry about hoovering is a tick checked
                off my todo list before I even have time to say Vacuumba!
              </Testimony>
            </MotionCenter>
          </VStack>
        </SlideFade>
      </Parallax>
    </>
  );
};

export default Home;
