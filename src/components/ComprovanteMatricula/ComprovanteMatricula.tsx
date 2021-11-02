import React, { forwardRef, useEffect, useState } from "react";

import buscarInformacoesCompletas from "../../usecases/buscarInformacoesCompletasMatricula";
import buscarInformacoesInstituicao from "../../usecases/buscarInformacoesInstituicao";
import { formatarCNPJ } from "../../utils/formatarStrings";
import pastoralLogo from "../../assets/images/pastoral-menor.jpg";

interface Props {
  id?: number;
}

const ComprovanteMatricula = forwardRef<HTMLInputElement, Props>(
  ({ id }, ref) => {
    const [instituicao, setInstituicao] = useState<any>();
    const [dadosMatricula, setDadosMatricula] = useState<any>();

    useEffect(() => {
      buscarInformacoes();
    }, []);

    useEffect(() => {
      buscarDadosMatricula();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const buscarInformacoes = async () => {
      const instituicao = await buscarInformacoesInstituicao();

      setInstituicao(instituicao);
    };

    const buscarDadosMatricula = async () => {
      const dados = await buscarInformacoesCompletas(id);

      setDadosMatricula(dados);
    };

    const tratarTipoResponsavelAluno = (responsavel: string) => {
      return {
        mae: "Mãe",
        pai: "Pai",
        avo: "Avó/Avô",
        outros: "Outros",
      }[responsavel];
    };

    return (
      <div
        ref={ref}
        style={{
          height: "29cm",
          width: "21cm",
          padding: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            marginBottom: 20,
          }}
        >
          <img src={pastoralLogo} alt="Logo da pastoral" width={100} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <h1
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: 14,
                textAlign: "center",
                margin: 0,
              }}
            >
              Pastoral do menor da Paróquia Nossa Senhora das Graças
            </h1>
            <h2 style={{ margin: 0, fontSize: 14, fontWeight: "bold" }}>
              Fundada em 19.03.1996
            </h2>
            <h3 style={{ margin: 0, fontSize: 14 }}>
              Declaração de Utilizada Pública: Lei Municipal nª 927/98
            </h3>
            <h3 style={{ margin: 0, fontSize: 14 }}>
              Declaração de Utilizada Pública: Lei Estadual nª 8.914/03
            </h3>
            <h3 style={{ margin: 0, fontSize: 14 }}>
              Certificação Federal: Portaria CNAS 62/15
            </h3>
            <h3 style={{ margin: 0, fontSize: 14 }}>
              {formatarCNPJ(instituicao?.cnpj || "")}
            </h3>
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: -40,
            }}
          >
            <div
              style={{
                width: "60%",
              }}
            >
              <h2
                style={{
                  fontSize: 14,
                  textTransform: "uppercase",
                  textAlign: "end",
                  fontWeight: "bold",
                  marginBottom: 20,
                }}
              >
                Ficha de matrícula
              </h2>
              <h2
                style={{
                  fontSize: 14,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Data da matrícula - {dadosMatricula?.matricula?.data}
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                border: "2px solid #000",
                width: "3cm",
                height: "4cm",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span>Foto 3 x 4</span>
            </div>
          </div>

          <div>
            <h2
              style={{
                fontSize: 14,
                textTransform: "uppercase",
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Dados do aluno
            </h2>

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                marginBottom: 10,
              }}
            >
              <h2
                style={{
                  fontSize: 14,
                  marginTop: 0,
                  marginBottom: 0,
                  marginRight: 4,
                }}
              >
                Educando:
              </h2>
              <h3
                style={{
                  fontSize: 12,
                  margin: 0,
                }}
              >
                {dadosMatricula?.aluno?.nome}
              </h3>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                marginBottom: 10,
              }}
            >
              <h2
                style={{
                  fontSize: 14,
                  marginTop: 0,
                  marginBottom: 0,
                  marginRight: 4,
                }}
              >
                Data de Nascimento:
              </h2>
              <h3
                style={{
                  fontSize: 12,
                  marginTop: 0,
                  marginBottom: 0,
                  marginRight: 20,
                }}
              >
                {dadosMatricula?.aluno?.dataNascimento}
              </h3>
              <h2
                style={{
                  fontSize: 14,
                  marginTop: 0,
                  marginBottom: 0,
                  marginRight: 4,
                }}
              >
                Sexo:
              </h2>
              <h3
                style={{
                  fontSize: 12,
                  marginTop: 0,
                  marginBottom: 0,
                  marginRight: 10,
                }}
              >
                ( {dadosMatricula?.aluno?.sexo === "masculino" && "X"} )
                Masculino
              </h3>
              <h3
                style={{
                  fontSize: 12,
                  margin: 0,
                }}
              >
                ( {dadosMatricula?.aluno?.sexo === "feminino" && "X"} ) Feminino
              </h3>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              RG:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              {dadosMatricula?.aluno?.rg}
            </h3>

            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Data de expedição:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              {dadosMatricula?.aluno?.dataExpedicao}
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              CPF.:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              {dadosMatricula?.aluno?.cpf}
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Naturalidade:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              {dadosMatricula?.aluno?.naturalidade}
            </h3>

            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Nacionalidade:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              {dadosMatricula?.aluno?.nacionalidade}
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Certidão de nascimento:
            </h2>
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Nª do termo:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              {dadosMatricula?.aluno?.termoCN}
            </h3>

            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Folha:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              {dadosMatricula?.aluno?.folhaCN}
            </h3>
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Livro:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              {dadosMatricula?.aluno?.livroCN}
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Escola:
            </h2>
            <h3
              style={{
                fontSize: 12,
                margin: 0,
              }}
            >
              {dadosMatricula?.matricula?.escola}
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Série:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              {dadosMatricula?.matricula?.serie}
            </h3>

            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Turno:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
                textTransform: "capitalize",
              }}
            >
              {dadosMatricula?.matricula?.turno}
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Endereço:
            </h2>
            <h3
              style={{
                fontSize: 12,
                margin: 0,
              }}
            >
              {dadosMatricula?.aluno?.endereco}
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Telefone:
            </h2>
            <h3
              style={{
                fontSize: 12,
                margin: 0,
              }}
            >
              {dadosMatricula?.aluno?.telefone}
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Em caso de emergência avisar a:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              {dadosMatricula?.aluno?.nomeContatoUrgencia}
            </h3>

            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Telefone:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              {dadosMatricula?.aluno?.telefoneContatoUrgencia}
            </h3>
          </div>
        </div>
        <div
          style={{
            marginBottom: 220,
          }}
        >
          <h2
            style={{
              fontSize: 14,
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Dados da família
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Responsável pelo aluno:
            </h2>
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              {tratarTipoResponsavelAluno(
                dadosMatricula?.responsavel?.parentesco
              )}
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Nome:
            </h2>
            <h3
              style={{
                fontSize: 12,
                margin: 0,
              }}
            >
              {dadosMatricula?.responsavel?.nome}
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              RG:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              {dadosMatricula?.responsavel?.rg}
            </h3>

            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              CPF:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              {dadosMatricula?.responsavel?.cpf}
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Endereço:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              {dadosMatricula?.responsavel?.endereco}
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Telefone:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              {dadosMatricula?.responsavel?.telefone}
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Tem parente na pastoral:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              {dadosMatricula?.aluno?.temParente ? "SIM" : "NÃO"}
            </h3>

            {dadosMatricula?.aluno?.temParente && (
              <>
                <h2
                  style={{
                    fontSize: 14,
                    marginTop: 0,
                    marginBottom: 0,
                    marginRight: 4,
                  }}
                >
                  Telefone:
                </h2>
                <h3
                  style={{
                    fontSize: 12,
                    marginTop: 0,
                    marginBottom: 0,
                    marginRight: 20,
                  }}
                >
                  {dadosMatricula?.aluno?.nomeParente}
                </h3>
              </>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Renda familiar:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              {dadosMatricula?.responsavel?.rendaFamiliar}
            </h3>

            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Tem parente na pastoral:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              {dadosMatricula?.responsavel?.bolsaSocial ? "SIM" : "NÃO"}
            </h3>

            {dadosMatricula?.responsavel?.bolsaSocial && (
              <>
                <h2
                  style={{
                    fontSize: 14,
                    marginTop: 0,
                    marginBottom: 0,
                    marginRight: 4,
                  }}
                >
                  NIS:
                </h2>
                <h3
                  style={{
                    fontSize: 12,
                    marginTop: 0,
                    marginBottom: 0,
                    marginRight: 20,
                  }}
                >
                  {dadosMatricula?.responsavel?.nis}
                </h3>
              </>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Ocupação profissional:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              {dadosMatricula?.responsavel?.ocupacaoProfissional}
            </h3>

            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Religião:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              {dadosMatricula?.responsavel?.religiao}
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 4,
              }}
            >
              Assinatura do responsável pelo educando:
            </h2>
            <h3
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 20,
              }}
            >
              _________________________________________________________________
            </h3>
          </div>
        </div>
        <h4
          style={{
            textAlign: "center",
            fontSize: 12,
          }}
        >
          {instituicao?.endereco} - Fone: {instituicao?.telefone}
        </h4>
      </div>
    );
  }
);

export default ComprovanteMatricula;
