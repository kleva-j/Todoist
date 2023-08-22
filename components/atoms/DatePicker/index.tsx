import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { monthNamesShort, weekdayNamesShort } from "utils";
import { useDayzed } from "dayzed";
import { useState } from "react";
import {
  useColorModeValue,
  IconButton,
  Heading,
  VStack,
  Spacer,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";

const DatePicker = (props: any) => {
  const [selectedDate, setDate] = useState<Date>(new Date(Date.now()));

  const onDateSelected = (dateObj: any) => setDate(dateObj.date);

  const { calendars, getBackProps, getForwardProps, getDateProps } = useDayzed({
    ...props,
    selected: selectedDate,
    onDateSelected,
  });

  const { month, weeks, year } = calendars[0];

  return (
    <VStack
      bg={useColorModeValue("gray.50", "gray.700")}
      borderRadius="md"
      maxW="280px"
      shadow="md"
      p="4"
    >
      <Flex w="full" align="center" mb="4">
        <Flex align="baseline">
          <Heading size="md">{monthNamesShort[month]}</Heading>
          <Text pl="1">{year}</Text>
        </Flex>
        <Spacer />
        <Box>
          <IconButton
            aria-label="previous month"
            size="sm"
            variant="ghost"
            icon={<FiChevronLeft fontSize="25px" color="#3126b9" />}
            mr="4"
            {...getBackProps({ calendars })}
          />
          <IconButton
            aria-label="next month"
            size="sm"
            variant="ghost"
            icon={<FiChevronRight fontSize="25px" color="#3126b9" />}
            {...getForwardProps({ calendars })}
          />
        </Box>
      </Flex>
      <VStack w="full">
        <Flex justify="space-between" w="full">
          {weekdayNamesShort.map((weekday: string, index: number) => (
            <Text
              w="30px"
              key={weekday + index}
              fontSize="xs"
              fontWeight="bold"
              textAlign="center"
            >
              {weekday}
            </Text>
          ))}
        </Flex>
        <VStack w="full" spacing="2">
          {weeks.map((week: any, weekIndex: any) => {
            const key = `${month}${year}${weekIndex}`;
            const weekDays = week.map((dateObj: any) => {
              const { date, today, selected, selectable } = dateObj;
              const newDate = new Date(date);
              return (
                <Box
                  key=""
                  minW="30px"
                  minH="30px"
                  textAlign="center"
                  fontSize="xs"
                  border="2px solid"
                  borderColor={today ? "_primary.200" : "transparent"}
                  bg={selected ? "_primary.200" : "transparent"}
                  cursor={selectable ? "pointer" : "default"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="md"
                  color={selected ? "white" : "black"}
                  _hover={{
                    bg: selectable ? "_primary.200" : "transparent",
                    color: selectable ? "white" : "transparent",
                  }}
                  {...(date ? getDateProps({ dateObj }) : {})}
                >
                  {date ? newDate.getDate() : " "}
                </Box>
              );
            });
            return (
              <Flex w="full" align="stretch" justify="space-between" key="">
                {weekDays}
              </Flex>
            );
          })}
        </VStack>
      </VStack>
    </VStack>
  );
};

export default DatePicker;
