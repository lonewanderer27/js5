import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Image, Stack, Text } from "@chakra-ui/react";

export default function DeveloperCard(props: {
  image: string,
  name: string,
  role: string,
  description: string,
  links: {
    name: string,
    url: string
  }[]
}){
  return (
    <Card maxW="sm">
      <CardBody>
        <Image 
          boxSize="100px"
          objectFit="cover"
          src={props.image}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Text fontFamily="secondary" fontWeight="bold">{props.name}</Text>
          <Text fontFamily="secondary" color="GrayText">{props.role}</Text>
          <Divider />
          <Text fontFamily="secondary">
            {props.description}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2" variant="solid">
          {props.links.map((link, index) => (
            <Button key={index} as="a" href={link.url} target="_blank">{link.name}</Button>
          ))}
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}