import { Container, Header } from "semantic-ui-react";
import PartnersView from "./PartnersView";

function App() {
  return (
    <Container>
      <Header as="h3" style={{ marginTop: "20px" }}>
        Partners
      </Header>
      <PartnersView />
    </Container>
  );
}

export default App;
