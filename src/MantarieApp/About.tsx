import { Image, Text } from "@chakra-ui/react";

import DeveloperCard from "./DeveloperCard";

export default function About(){
  return (
    <div className="p-10">
      <Image src="/MantarieApp/mantarie_icon.png" className="h-[100px] mb-10" />
      <Text className="pb-5" fontFamily="secondary">Mantarie is a numerical methods tool built using React. It allows users to determine the value of a definite integral using two methods; Trapezoidal & Simpson's.</Text>
      
      <Text className="pb-5" fontFamily="secondary">Users can enter a mathematical function, set the upper and lower limit, and the number of intervals. This website will then generate two tables, the first one shows the Results table showing the answers for Trapezoidal & Simpson's. The second table shows the values generated for each interval in detail.</Text>

      <Text className="pb-20" fontFamily="secondary">Mantarie uses MathJS library to parse and evaluate the user's mathematical function.</Text>

      <Text className="pb-5">
        Who developed this awesome app?
      </Text>
      <div className="flex gap-10 pb-20">
        <DeveloperCard 
          name="Adriane James"
          image="/MantarieApp/jay.jpg" 
          role="Fullstack Web Dev" 
          description="Passionate about creating highly interactive web applications with responsive design on every device. A team player but can also work independently. Values efficiency and timeliness in assigned tasks." 
          links={[
            { name: "Github", url: "https://github.com/lonewanderer27" },
            { name: "Personal Site", url: "https://jay.thedev.id"},
            { name: "LinkedIn", url: "https://linkedin.com/in/jay-puzon"}
          ]} />
        <DeveloperCard 
          name="Mark James" 
          image="/MantarieApp/marky.jpg"
          role="Software Engineer" 
          description="A computer science major who is experienced in frontend web development and UI design. I aim to utilize my knowledge to help others and gain more experiences." 
          links={[
            { name: "Facebook", url: "https://www.facebook.com/MarkyJamesBonifacio" },
            { name: "GitHub", url: "https://github.com/SwiftNCloak"},
            { name: "LinkedIn", url: "https://www.linkedin.com/in/markjamescbonifacio/"}
          ]} />
      </div>

      <Text className="pb-5">
        Where to find the source code of this app?
      </Text>
      <Text className="pb-10" fontFamily="secondary">
        The source code for this app is available on <a className="underline" href="https://github.com/lonewanderer27/mantarie" target="_blank">Github</a>. Feel free to contribute to this project!
      </Text>
    </div>
  )
}