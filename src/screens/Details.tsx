import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import { api } from "../services/api";
import { PoolCardProps } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from "../components/Option";
import { Share } from "react-native";

interface RouteParams {
    id: string;
}

export const Details = () => {
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses');
  const [isLoading, setIsLoading] = useState(false);
  const [pollDetails, setPollDetails] = useState<PoolCardProps>({} as PoolCardProps);

  const toast = useToast();
  const route = useRoute();
  const { id } = route.params as RouteParams;

  const handleCodeShare = async () => {
    await Share.share({
        message: pollDetails.code
    });
  }

  const fetchPollDetails = async () => {
    try {
        setIsLoading(true);

        const response = await api.get(`/polls/${id}`);
        setPollDetails(response.data.poll);
        
    } catch (error) {
        console.log(error);
        
        toast.show({
            title: 'Não foi possivel carregar os detalhes boão',
            placement: 'top',
            bgColor: 'red.500'
        });
    } finally {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPollDetails();
  }, [id])

  if (isLoading) {
    return (
        <Loading />
    )
  }

  return (
    <VStack flex={1} bg="gray.900">
        <Header title={pollDetails.title} showBackButton showShareButton onShare={handleCodeShare} />

        {
            pollDetails._count?.participants > 0 ?
            <VStack px={5} flex={1}>
                <PoolHeader data={pollDetails} />

                <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                    <Option
                        title="Seus palpites"
                        isSelected={optionSelected === 'guesses'}
                        onPress={() => setOptionSelected('guesses')}
                    />
                    <Option
                        title="Ranking do grupo"
                        isSelected={optionSelected === 'ranking'}
                        onPress={() => setOptionSelected('ranking')}
                    />
                </HStack>
            </VStack>

            : <EmptyMyPoolList code={pollDetails.code} />
        }
    </VStack>
  );
};
