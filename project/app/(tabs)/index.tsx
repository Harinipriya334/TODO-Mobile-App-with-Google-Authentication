import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus, CircleCheck as CheckCircle, Clock } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useTasks } from '@/contexts/TaskContext';
import TaskCard from '@/components/TaskCard';
import EmptyState from '@/components/EmptyState';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { tasks, toggleTask } = useTasks();

  const todayTasks = tasks.filter(task => {
    const today = new Date().toDateString();
    const taskDate = new Date(task.dueDate).toDateString();
    return taskDate === today && !task.completed;
  });

  const upcomingTasks = tasks.filter(task => {
    const today = new Date();
    const taskDate = new Date(task.dueDate);
    return taskDate > today && !task.completed;
  });

  const completedTasks = tasks.filter(task => task.completed);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/create')}
        >
          <Plus size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Today Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today</Text>
          {todayTasks.length > 0 ? (
            todayTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={() => toggleTask(task.id)}
                onPress={() => {}}
              />
            ))
          ) : (
            <EmptyState
              icon="📋"
              title="No tasks yet"
              subtitle="No tasks for today, but that's okay - you've got this!"
              actionText="Create task"
              onAction={() => router.push('/create')}
            />
          )}
        </View>

        {/* Upcoming Section */}
        {upcomingTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming</Text>
            {upcomingTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={() => toggleTask(task.id)}
                onPress={() => {}}
              />
            ))}
          </View>
        )}

        {/* Completed Section */}
        {completedTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Completed</Text>
            {completedTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={() => toggleTask(task.id)}
                onPress={() => {}}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  greeting: {
    fontSize: 14,
    color: '#8E8E93',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
});