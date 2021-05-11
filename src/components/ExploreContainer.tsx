import "./ExploreContainer.css";

import fazerLogin from "../usecases/fazerLogin";

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const importar = async () => {
    const resposta = await fazerLogin("vinicios", "13");

    console.log({ resposta });
  };

  return (
    <div className="container">
      <strong>{name}</strong>
      <p>
        Explore
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://ionicframework.com/docs/components"
        >
          UI Components
        </a>
      </p>

      <button onClick={importar}>teste</button>
    </div>
  );
};

export default ExploreContainer;
