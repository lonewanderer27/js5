import { Box, Heading, SlideFade, Image, Text } from "@chakra-ui/react";

export default function About(){
  return (
    <Box color="white">
      <div className="flex justify-center gap-10">
        <Image 
          src="/CalculogApp/vite.svg"
          alt="CalcuLog Logo"
          boxSize="100px"
        />
        <Image
          src="/RootifyApp/logo.png"
          alt="Rootify Logo"
          boxSize="100px"
        />
        <Image
          src="/PolarisApp/polaris_icon.png"
          alt="Polaris Logo"
          boxSize="100px"
        />
        <Image 
          src="/MantarieApp/mantarie_icon.png"
          alt="Mantarie Logo"
          boxSize="100px"
        />
      </div>
      <Text marginTop={50}>
        JS5 is a compilation of all the numerical methods tools we built as a requirement for Numerical Analysis subject under Sir Ignacio.
      </Text>
      <Text marginTop={10}>
      It consists of 4 tools which each tackle a numerical analysis problem. The first one; Calculog allows users to perform calculations involving propagation error and Taylor-Maclaurin series. <br/><br/>

      Meanwhile the second one; Rootify allows users to calculate the roots of a function using two different methods: the bisection method and the Newton-Raphson method.  <br/><br/>

      The third one; Polaris is a calculator that determines the crypto exchange over time using Lagrange Method. <br/><br/>

      And the last one Mantarie allows users to calculate the roots of a function using two different methods: the bisection method and the Newton-Raphson method. <br/><br/>
      </Text>
    </Box>
  )
}