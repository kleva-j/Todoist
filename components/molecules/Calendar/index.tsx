import {
  useColorModeValue,
  IconButton,
  VStack,
  chakra,
  Spacer,
  Select,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import {
  weekdayNamesShort,
  getInitialData,
  reorderList,
  monthNames,
} from "utils";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Event } from "components/atoms/DraggableEvent";
import { useDayzed } from "dayzed";
import { useState } from "react";

enum SchedulerView {
  week = "Week",
  month = "Month",
}

type event = {
  id: string;
  text: string;
};

export const Scheduler = (props: any) => {
  const [selectedDate, setDate] = useState<Date>(new Date(Date.now()));
  const [view, setView] = useState<SchedulerView>(SchedulerView.month);
  const [state, setState] = useState(() => getInitialData());

  const { calendars, getBackProps, getForwardProps } = useDayzed({
    ...props,
    selected: selectedDate,
  });

  const today = new Date().toLocaleString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    if (result.type === "column") {
      const columnOrder = reorderList(
        state.columnOrder,
        result.source.index,
        result.destination.index
      );
      setState({
        ...state,
        columnOrder,
      });
      return;
    }

    // reordering in same list
    if (result.source.droppableId === result.destination.droppableId) {
      const column = state.columns[result.source.droppableId];
      const items = reorderList(
        column.items,
        result.source.index,
        result.destination.index
      );

      // updating column entry
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [column.id]: {
            ...column,
            items,
          },
        },
      };
      setState(newState);
      return;
    }

    // moving between lists
    const sourceColumn = state.columns[result.source.droppableId];
    const destinationColumn = state.columns[result.destination.droppableId];
    const item = sourceColumn.items[result.source.index];

    // 1. remove item from source column
    const newSourceColumn = {
      ...sourceColumn,
      items: [...sourceColumn.items],
    };
    newSourceColumn.items.splice(result.source.index, 1);

    // 2. insert into destination column
    const newDestinationColumn = {
      ...destinationColumn,
      items: [...destinationColumn.items],
    };
    // in line modification of items
    newDestinationColumn.items.splice(result.destination.index, 0, item);

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      },
    };

    setState(newState);
  };

  const { month, weeks, year } = calendars[0];

  return (
    <VStack w="full">
      <Flex
        bg={useColorModeValue("gray.200", "gray.700")}
        w="full"
        align="center"
        px="4"
        py="1"
        borderRadius="5"
      >
        <chakra.fieldset pb="1">
          <Text fontWeight="semibold">
            {monthNames[month - 1]} {year}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {today}
          </Text>
        </chakra.fieldset>
        <Spacer />
        <Box>
          <IconButton
            aria-label="previous month"
            isRound={true}
            size="sm"
            icon={<FiChevronLeft fontSize="25px" />}
            color={useColorModeValue("gray.600", "gray.200")}
            _hover={{ bg: useColorModeValue("gray.300", "gray.600") }}
            {...getBackProps({ calendars })}
          />
          <IconButton
            aria-label="next month"
            isRound={true}
            size="sm"
            mx="4"
            icon={<FiChevronRight fontSize="25px" />}
            color={useColorModeValue("gray.600", "gray.200")}
            _hover={{ bg: useColorModeValue("gray.300", "gray.600") }}
            {...getForwardProps({ calendars })}
          />
        </Box>

        <Select
          size="sm"
          placeholder={`${view} View`}
          variant="outline"
          maxW="max-content"
          cursor="pointer"
          borderRadius="5px"
          border="1px solid"
          borderColor={useColorModeValue("gray.400", "gray.500")}
          _hover={{ borderColor: useColorModeValue("gray.500", "gray.400") }}
        >
          <option value={SchedulerView.week}>Week View</option>
        </Select>
      </Flex>
      <Flex
        w="full"
        justify="space-between"
        align="stretch"
        borderRadius="3"
        overflow="hidden"
      >
        {weekdayNamesShort.map((weekday: string, index: number) => (
          <Text
            py="2"
            w="full"
            key={`${month}-${year}-${weekday}-${index}`}
            bg="_primary.300"
            color="gray.100"
            fontSize="sm"
            fontWeight="bold"
            textAlign="center"
          >
            {weekday}
          </Text>
        ))}
      </Flex>
      <DragDropContext onDragEnd={handleDragEnd}>
        <VStack
          w="full"
          align="center"
          spacing="0px"
          borderBottom="1px solid"
          borderBottomColor="gray.400"
        >
          {weeks.map((week: any, weekIndex: any) => {
            const weekDays = week.map((dateObj: any, index: number) => {
              const { date } = dateObj;
              const newDate = new Date(date);
              const key = `${month}-${year}-${weekIndex}-${index}`;
              return (
                <Droppable droppableId="characters" key={key}>
                  {(provided) => (
                    <Box
                      h="140px"
                      fontSize="lg"
                      w="full"
                      px="4"
                      py="4"
                      color="_primary.400"
                      display="block"
                      borderRight="1px solid"
                      borderRightColor="gray.400"
                      fontWeight="semibold"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {date ? newDate.getDate() : ""}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              );
            });
            const key = `${month}${year}${weekIndex}`;
            return (
              <Flex
                key={key}
                w="full"
                align="stretch"
                justify="space-between"
                borderTop="1px solid"
                borderLeft="1px solid"
                borderTopColor="gray.400"
                borderLeftColor="gray.400"
              >
                {weekDays}
              </Flex>
            );
          })}
        </VStack>
      </DragDropContext>
    </VStack>
  );
};
