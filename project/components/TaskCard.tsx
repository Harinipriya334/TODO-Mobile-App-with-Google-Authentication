import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CircleCheck as CheckCircle, Circle, Clock } from 'lucide-react-native';
import { Task } from '@/contexts/TaskContext';

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onPress: () => void;
}

export default function TaskCard({ task, onToggle, onPress }: TaskCardProps) {
  const priorityColors = {
    low: '#34C759',
    medium: '#FF9500',
    high: '#FF3B30',
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, task.completed && styles.completedContainer]}
      onPress={onPress}
    >
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={onToggle}
      >
        {task.completed ? (
          <CheckCircle size={24} color="#34C759" />
        ) : (
          <Circle size={24} color="#C7C7CC" />
        )}
      </TouchableOpacity>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            task.completed && styles.completedTitle
          ]}
          numberOfLines={2}
        >
          {task.title}
        </Text>
        
        {task.description && (
          <Text
            style={[
              styles.description,
              task.completed && styles.completedDescription
            ]}
            numberOfLines={2}
          >
            {task.description}
          </Text>
        )}

        <View style={styles.footer}>
          <View style={styles.dateContainer}>
            <Clock size={14} color="#8E8E93" />
            <Text style={styles.dateText}>
              {formatDate(task.dueDate)}
            </Text>
          </View>

          <View
            style={[
              styles.priorityDot,
              { backgroundColor: priorityColors[task.priority] }
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F2F2F7',
  },
  completedContainer: {
    opacity: 0.6,
  },
  checkboxContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  description: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
    lineHeight: 20,
  },
  completedDescription: {
    textDecorationLine: 'line-through',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});