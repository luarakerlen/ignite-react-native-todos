import React, { useState, useRef } from "react";
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Text,
	Image,
	TextInput,
} from "react-native";
import trashIcon from "../assets/icons/trash/trash.png";
import penIcon from "../assets/icons/pen/pen.png";
import Icon from "react-native-vector-icons/Feather";
import { Task } from "./TasksList";
import { useEffect } from "react";

interface TaskItemProps {
	index: number;
	toggleTaskDone: (id: number) => void;
	item: Task;
	removeTask: (id: number) => void;
	editTask: (taskEdited: { taskId: number; taskNewTitle: string }) => void;
}

export function TaskItem({
	index,
	toggleTaskDone,
	item,
	removeTask,
	editTask,
}: TaskItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(item.title);
	const textInputRef = useRef<TextInput>(null);

	function handleStartEditing() {
		setIsEditing(true);
	}

	function handleCancelEditing() {
		setTitle(item.title);
		setIsEditing(false);
	}

	function handleSubmitEditing() {
		editTask({ taskId: item.id, taskNewTitle: title });
		setIsEditing(false);
	}

	useEffect(() => {
		if (textInputRef.current) {
			if (isEditing) {
				textInputRef.current.focus();
			} else {
				textInputRef.current.blur();
			}
		}
	}, [isEditing]);

	return (
		<>
			<View>
				<TouchableOpacity
					testID={`button-${index}`}
					activeOpacity={0.7}
					style={styles.taskButton}
					onPress={() => toggleTaskDone(item.id)}
				>
					<View
						testID={`marker-${index}`}
						style={item.done ? styles.taskMarkerDone : styles.taskMarker}
					>
						{item.done && <Icon name="check" size={12} color="#FFF" />}
					</View>

					<TextInput
						value={title}
						onChangeText={setTitle}
						editable={isEditing}
						onSubmitEditing={handleSubmitEditing}
						style={item.done ? styles.taskTextDone : styles.taskText}
						ref={textInputRef}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.iconsContainer}>
				{isEditing ? (
					<TouchableOpacity
						testID={`trash-${index}`}
						style={{ paddingHorizontal: 24 }}
						onPress={handleCancelEditing}
					>
						<Icon name="x" size={24} color="#b2b2b2" />
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						testID={`trash-${index}`}
						style={{ paddingHorizontal: 24 }}
						onPress={handleStartEditing}
					>
						<Image source={penIcon} />
					</TouchableOpacity>
				)}
        <View 
    style={ styles.iconsDivider }
  />
				<TouchableOpacity
					disabled={isEditing}
					testID={`trash-${index}`}
					style={{ paddingHorizontal: 24, opacity: isEditing ? 0.2 : 1 }}
					onPress={() => removeTask(item.id)}
				>
					<Image source={trashIcon} />
				</TouchableOpacity>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	taskButton: {
		flex: 1,
		paddingHorizontal: 24,
		paddingVertical: 15,
		marginBottom: 4,
		borderRadius: 4,
		flexDirection: "row",
		alignItems: "center",
	},
	taskMarker: {
		height: 16,
		width: 16,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: "#B2B2B2",
		marginRight: 15,
		alignItems: "center",
		justifyContent: "center",
	},
	taskText: {
		color: "#666",
		fontFamily: "Inter-Medium",
	},
	taskMarkerDone: {
		height: 16,
		width: 16,
		borderRadius: 4,
		backgroundColor: "#1DB863",
		marginRight: 15,
		alignItems: "center",
		justifyContent: "center",
	},
	taskTextDone: {
		color: "#1DB863",
		textDecorationLine: "line-through",
		fontFamily: "Inter-Medium",
	},
  iconsContainer: {
    flexDirection: 'row',
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
  }
});
