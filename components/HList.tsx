import React, { useMemo } from "react";
import { FlatList, Text } from "react-native";
import styled from "styled-components/native";
import VMedia from "./VMedia";
import { AntDesign } from "@expo/vector-icons";

interface HListProps {
  title: string;
  data: any;
}

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  margin-left: 20px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;

const EmptyResults = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
`;

const EmptyText = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

export const HListSeparator = styled.View`
  width: 20px;
`;

const HList: React.FC<HListProps> = ({ title, data }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    {data.length > 0 ? (
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        ItemSeparatorComponent={HListSeparator}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            title={item.name || item.title}
            voteAverage={item.vote_average}
            fullData={item}
          />
        )}
      />
    ) : (
      <EmptyResults>
        <EmptyText>결과가 없습니다.</EmptyText>
        <EmptyText>
          <AntDesign name="closesquare" size={24} />
        </EmptyText>
      </EmptyResults>
    )}
  </ListContainer>
);

export default HList;
