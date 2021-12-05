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
import React, { forwardRef } from "react";
import pastoralLogo from "../../assets/images/pastoral-menor.jpg";

interface Props {
  oficina?: any;
  alunos: any[];
}

const AlunosMatriculaImpressao = forwardRef<HTMLInputElement, Props>(
  ({ oficina, alunos }, ref) => {
    return (
      <Stack padding={10} ref={ref}>
        <Flex justifyContent="center" mb={10}>
          <img src={pastoralLogo} alt="Logo da pastoral" width={100} />
        </Flex>
        <Text fontWeight="bold" textAlign="center">
          Alunos da oficina - {oficina?.nome}
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

export default AlunosMatriculaImpressao;
