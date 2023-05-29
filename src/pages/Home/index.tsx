import MultiStep from "../../components/MultiStep";
import { SectionContextProvider } from "../../contexts/SectionContext";
import { Container } from "./styles";

const Home = () => {
	return (
		<SectionContextProvider>
			<Container>
				<MultiStep />
			</Container>
		</SectionContextProvider>
	);
};

export default Home;
