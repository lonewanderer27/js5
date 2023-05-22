import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AnswerType } from "./types";

export default function IterationsTable(props: {
  answer: AnswerType | null
}) {
  return (
    <div>
      <TableContainer>
        <Table variant="striped" bg="c_secondary">
          <Thead>
            <Tr>
              <Th>Interval</Th>
              <Th>Xi</Th>
              <Th>f(Xi)</Th>
              <Th>Ti</Th>
              <Th>Si</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props?.answer?.iterations.map((answer, index) => (
              <Tr key={index}>
                <Td>{answer.i}</Td>
                <Td>{answer.xi}</Td>
                <Td>{answer.f_xi}</Td>
                <Td>{answer.ti}</Td>
                <Td>{answer.si}</Td>
              </Tr>
            ))}
            <Tr>
              <Td colSpan={3}></Td>
              <Td colSpan={1}>SUM(Ti) = {props?.answer?.sum_ti}</Td>
              <Td colSpan={1}>SUM(Si) = {props?.answer?.sum_si}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
