import {
  Stack,
  Table,
  Text,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import pastoralLogo from "../../assets/images/pastoral-menor.jpg";

interface Props {
  alunos: any[];
}

const AlunosMatriculados = forwardRef<HTMLInputElement, Props>(
  ({ alunos }, ref) => {
    return (
      <Stack padding={10} ref={ref}>
        <Flex justifyContent="center" mb={10}>
          <img src={pastoralLogo} alt="Logo da pastoral" width={100} />
        </Flex>
        <Text fontWeight="bold" textAlign="center">
          Alunos matriculados
        </Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nome</Th>
            </Tr>
          </Thead>
          <Tbody>
            {alunos?.map((aluno) => (
              <Tr key={aluno?.id}>
                <Td>{aluno.nome}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>
    );
  }
);

export default AlunosMatriculados;
