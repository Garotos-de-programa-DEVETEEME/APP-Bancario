import { ScreenState } from '@/@Types/ScreenState';
import { ScreenStates } from '@/components/BaseScreen/ScreenStates';
import React from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';

export interface BaseScreenProps {
  state: ScreenState;
  children: React.ReactNode;
  ErrorComponent?: React.ReactNode;
  onRetry?: () => void;
}

export const BaseScreen: React.FC<BaseScreenProps> = ({
  state,
  children,
  ErrorComponent,
  onRetry,
}) => {
  switch (state.type) {
    case ScreenStates.loading().type:
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.text}>Carregando...</Text>
        </View>
      );

    case ScreenStates.error().type:
      return (
        <View style={styles.center}>
          {ErrorComponent ? (
            ErrorComponent
          ) : (
            <>
              <Text style={styles.errorText}>{state.message ?? 'Ocorreu um erro desconhecido'}</Text>
              {onRetry && <Button title="Tentar novamente" onPress={onRetry} />}
            </>
          )}
        </View>
      );

    case ScreenStates.content().type:
    default:
      return <View style={styles.container}>{children}</View>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    marginBottom: 10,
    color: 'red',
    fontSize: 16,
  },
});
