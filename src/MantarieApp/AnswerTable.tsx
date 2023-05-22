import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";

import { AnswerType } from "./types";

export default function AnswerTable(props: {
  answer: AnswerType | null,
  function_: string,
  a: number,
  b: number,
  n: number,
}){
  return <div>
    <TableContainer>
      <Table variant="striped" bg="c_secondary">
        <Thead>
          <Tr>
            <Th colSpan={4}>Result</Th>
          </Tr>
          <Tr>
            <Th>
              <Text>Given Values:</Text>
            </Th>
            <Th>
              <Text>Δx:</Text>
            </Th>
            <Th>
              <Text>Trapezoidal Method:</Text>
            </Th>
            <Th>
              <Text>Simpson's Method:</Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Text fontSize="sm">f(x) = {props.function_.includes("log(x+1)") ? "ln(x+1)" : props.function_}</Text>
              <Text fontSize="sm">b = {props.b}</Text>
              <Text fontSize="sm">a = {props.a}</Text>
              <Text fontSize="sm">n = {props.n}</Text>
            </Td>
            <Td>
              <Text fontSize="sm">= (a+b) / n</Text>
              <Text fontSize="sm">= ({`${props.a}+${props.b}`}) / {props.n}</Text>
              <Text fontSize="sm">= {props.a + props.b} / {props.n}</Text>
              <Text fontSize="sm">= <u>{props.answer?.deltaX}</u></Text>
            </Td>
            <Td>
              <Text fontSize="sm">= ( Δx/2 ) * Sum(Ti)</Text>
              <Text fontSize="sm">= ( {props.answer.deltaX}/{2} ) * {props.answer.sum_ti}</Text>
              <Text fontSize="sm">= {props.answer.deltaX/2} * {props.answer.sum_ti} </Text>
              <Text fontSize="sm">= <u>{props.answer?.ans_ti}</u> </Text>
            </Td>
            <Td>
              <Text fontSize="sm">= ( Δx/3 ) * Sum(Si)</Text>
              <Text fontSize="sm">= ( {props.answer.deltaX}/{3} ) * {props.answer.sum_si}</Text>
              <Text fontSize="sm">= {props.answer.deltaX/3} * {props.answer.sum_si} </Text>
              <Text fontSize="sm">= <u>{props.answer?.ans_si}</u> </Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  </div>
}