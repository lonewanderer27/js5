import './App.css'

import {
  Button,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SlideFade,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useDisclosure,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { HoverCalculators, Page } from './enums'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react'

import { motion } from "framer-motion"
import About from './About';

// import the apps
const CalculogApp = lazy(() => import("./CalculogApp/CalculogApp"))
const PolarisApp = lazy(() => import("./PolarisApp/PolarisApp"))
const MantarieApp = lazy(() => import('./MantarieApp/MantarieApp'))
const RootifyApp = lazy(() => import("./RootifyApp/RootifyApp"));

// theme the main app
const theme = extendTheme({
  fonts: {
    primary: "JetBrains Mono",
    secondary: "Inter, sans-serif",
  },
  styles: {
    global: {
      body: {
        backgroundImage: 'url("Background.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      },
    },
  },
  components: {
    Text: {
      baseStyle: {
        fontFamily: "secondary"
      }
    },
  }
});

export default function App() {
  const [page, setPage] = useState<Page>(() => Page.Home);
  const handleTabChange = (index: number) => {
    switch(index){
      case 0:
        goToPage(Page.Home);
        break
      case 1:
        goToPage(Page.About)
        break
    }
  }
  const [hoveredCalculator, setHoveredCalculator] = useState<HoverCalculators>(HoverCalculators.None);
  const hoveredCalcChange = (calculator: HoverCalculators) => {
    setHoveredCalculator(calculator)
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne/>);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === "p"){
      if (isOpen != true) {
        setOverlay(<OverlayOne/>)
        onOpen();
      } else {
        onClose();
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    console.log("Opened pause screen")

    // clean up event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goToPage = (page: Page) => {
    if (page === Page.Home) {
      document.title = "JS5";
    } else {
      document.title = page.toString()[0].toUpperCase() + page.toString().slice(1) + " - JS5";
    }
    setPage(page);
    navigate(`${page.toString()}`)
    onClose();
  }

  console.log("Pathname: ", pathname);

  useEffect(() => {
    if (pathname === "/") {
      setPage(Page.Home)
    } else {
      setPage(pathname.split("/")[1] as Page)
    }
  }, [pathname])

  return (
    <>
      <ChakraProvider theme={theme}>     
        {(page !== Page.About && page !== Page.Home) && 
        <Alert status='info'>
            <AlertIcon />
            To go back to the home screen, press the escape key or the "p" key.
        </Alert>}
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          {overlay}
          <ModalContent>
            <ModalHeader>Pause Menu</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              <VStack>
                {(page != Page.Home && page !== Page.About) && <>
                  <Button w="100%" onClick={() => onClose()}>
                    Resume
                  </Button>
                  <Button w="100%" onClick={() => goToPage(Page.Home)}>
                    Return to Home Screen
                  </Button>
                  <Divider/>
                </>}
                
                <Button w="100%" onClick={() => goToPage(Page.Calculog)}>
                  Open MP1: {Page.Calculog}
                </Button>
                <Button w="100%" onClick={() => goToPage(Page.Rootify)}>
                  Open MP2: {Page.Rootify}
                </Button>
                <Button w="100%" onClick={() => goToPage(Page.Polaris)}>
                  Open MP3: {Page.Polaris}
                </Button>
                <Button w="100%" onClick={() => goToPage(Page.Mantarie)}>
                  Open MP4: {Page.Mantarie}
                </Button>
              </VStack>
            </ModalBody>
            <Divider />
            <ModalFooter>
              {(page !== Page.Home && page !== Page.About) && (<Text>
                You are currently at {pathname.split("/")[1].toString()}
              </Text>)}
              {page === Page.Home && (<Text>You are in the Home Screen!</Text>)}
              {page === Page.About && (<Text>You are in the About Screen!</Text>)}
            </ModalFooter>
          </ModalContent>
        </Modal>

        {(pathname === "/" || pathname.includes(Page.About) ) && 
        <Tabs 
          padding={10}
          onChange={(index) => handleTabChange(index)} 
          align="center"
          variant="soft-rounded"
          size="lg"
        >
          <TabList>
            <Tab><Text>Calculators</Text></Tab>
            <Tab><Text>About</Text></Tab>
          </TabList>
          <TabIndicator color="white" />
          <TabPanels paddingTop="5">
            <SlideFade in={page === Page.Home} offsetX="200px" offsetY="0">
              <TabPanel>
                <div className="flex flex-col">
                  <div className="flex flex-row gap-4 h-[380px]" onMouseEnter={() => hoveredCalcChange(HoverCalculators.None)}>
                    <motion.div
                      className="rounded-3xl border border-white cursor-pointer"
                      animate={{
                        width: HoverCalculators.Calculog === hoveredCalculator ? "350px" : "200px",
                        height: HoverCalculators.Calculog === hoveredCalculator ? "250px" : "200px"
                      }}
                      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                      style={{backgroundImage: "url(/Calculog.png)", backgroundSize: "cover", backgroundPosition: "center"}}
                      onMouseEnter={() => hoveredCalcChange(HoverCalculators.Calculog)}
                      onMouseLeave={() => hoveredCalcChange(HoverCalculators.None)}
                      onClick={() => goToPage(Page.Calculog)}
                    />
                    <motion.div
                      className="rounded-3xl border border-white cursor-pointer"
                      animate={{ 
                        width: HoverCalculators.Rootify === hoveredCalculator ? "350px" : "200px", 
                        height: HoverCalculators.Rootify === hoveredCalculator ? "250px" : "200px" 
                      }}
                      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                      style={{backgroundImage: "url(/Rootify.png)", backgroundSize: "cover", backgroundPosition: "center"}}
                      onMouseEnter={() => hoveredCalcChange(HoverCalculators.Rootify)}
                      onMouseLeave={() => hoveredCalcChange(HoverCalculators.None)}
                      onClick={() => goToPage(Page.Rootify)}
                    />
                    <motion.div
                      className="rounded-3xl border border-white cursor-pointer"
                      animate={{
                        width: HoverCalculators.Polaris === hoveredCalculator ? "350px" : "200px",
                        height: HoverCalculators.Polaris === hoveredCalculator ? "250px" : "200px"
                      }}
                      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                      style={{backgroundImage: "url(/Polaris.png)", backgroundSize: "cover", backgroundPosition: "center"}}
                      onMouseEnter={() => hoveredCalcChange(HoverCalculators.Polaris)}
                      onMouseLeave={() => hoveredCalcChange(HoverCalculators.None)}
                      onClick={() => goToPage(Page.Polaris)}
                    />
                    <motion.div
                      className="rounded-3xl border border-white cursor-pointer"
                      animate={{
                        width: HoverCalculators.Mantarie === hoveredCalculator ? "350px" : "200px",
                        height: HoverCalculators.Mantarie === hoveredCalculator ? "250px" : "200px"
                      }}
                      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                      style={{backgroundImage: "url(/Mantarie.png)", backgroundSize: "cover", backgroundPosition: "center"}}
                      onMouseEnter={() => hoveredCalcChange(HoverCalculators.Mantarie)}
                      onMouseLeave={() => hoveredCalcChange(HoverCalculators.None)}
                      onClick={() => goToPage(Page.Mantarie)}
                    />
                  </div>

                  <div className="text-start">
                    <SlideFade in={hoveredCalculator !== HoverCalculators.None} offsetY="50px"> 
                        <Heading size="md" color="white">
                          {hoveredCalculator === HoverCalculators.Calculog && "Machine Problem 1: Calculog"}
                          {hoveredCalculator === HoverCalculators.Rootify && "Machine Problem 2: Rootify"}
                          {hoveredCalculator === HoverCalculators.Polaris && "Machine Problem 3: Polaris"}
                          {hoveredCalculator === HoverCalculators.Mantarie && "Machine Problem 4: Mantarie"}
                        </Heading>
                        <Text color="white" fontSize="xl">
                          {hoveredCalculator === HoverCalculators.Calculog && "Ready to solve Propagation Error and Taylor-Maclaurin? Then check out Calculog!"}
                          {hoveredCalculator === HoverCalculators.Rootify && "Ready to solve for the roots of a polynomial? Then check out Rootify!"}
                          {hoveredCalculator === HoverCalculators.Polaris && "Ready to determine crypto exchange value over time? Then check out Polaris!"}
                          {hoveredCalculator === HoverCalculators.Mantarie && "Ready to see the value of a definite integral? Then check out Mantarie!"}
                        </Text>
                    </SlideFade>
                    {hoveredCalculator === HoverCalculators.None && 
                    <SlideFade in={hoveredCalculator === HoverCalculators.None}>
                      <Heading color="whitesmoke" fontSize="lg">
                        Hover one of the icons above!<br/>
                      </Heading>
                      <Text color="white" fontSize="xl">
                      Tip: Press the <u>ESC</u> or <u>p</u> to access the Pause Menu while a calculator is opened.
                      </Text>
                    </SlideFade>}
                  </div>

                </div>
              </TabPanel>
            </SlideFade>
            <SlideFade in={page === Page.About} offsetX="200px" offsetY="0">
              <TabPanel>
                <About/>
              </TabPanel>
            </SlideFade>
          </TabPanels>
        </Tabs>}
      </ChakraProvider>

      <Routes>
        <Route 
          path={`/${Page.Calculog}`}
          element={(<Suspense fallback={<Heading color="white" padding={20}>Loading Calculog, please standby...</Heading>}>
                      {page === Page.Calculog && <CalculogApp/>}
                    </Suspense>)}
        />
        <Route 
          path={`/${Page.Rootify}`} 
          element={(<Suspense fallback={<Heading color="white" padding={20}>Loading Rootify, please standby...</Heading>}>
                      {page === Page.Rootify && <RootifyApp/>}
                    </Suspense>)}/>
        <Route 
          path={`/${Page.Polaris}`} 
          element={(<Suspense fallback={<Heading color="white" padding={20}>Loading Polaris, please standby...</Heading>}>
                      {page === Page.Polaris && <PolarisApp/>}
                    </Suspense>)}
        />
        <Route 
          path={`/${Page.Mantarie}`} 
          element={(<Suspense fallback={<Heading color="white" padding={20}>Loading Mantarie, please standby...</Heading>}>
                      {page === Page.Mantarie && <MantarieApp/>}
                    </Suspense>)}
        />
      </Routes>
    </>
  )
}

const OverlayOne = () => (
  <ModalOverlay
    bg='blackAlpha.300'
    backdropFilter='blur(10px) hue-rotate(90deg)'
  />
)