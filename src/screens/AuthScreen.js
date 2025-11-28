import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { useUser } from '../context/UserContext';

const AuthScreen = () => {
    const { signIn } = useUser();
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        rollNumber: '',
        branch: '',
        year: '',
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSignIn = async () => {
        const userData = {
            name: formData.name.trim(),
            isAdmin: isAdminMode,
        };

        // Add student-specific fields if not admin
        if (!isAdminMode) {
            if (formData.rollNumber) userData.rollNumber = formData.rollNumber.trim();
            if (formData.branch) userData.branch = formData.branch.trim();
            if (formData.year) userData.year = parseInt(formData.year, 10);
        }

        const result = await signIn(userData);

        if (!result.success) {
            const errorMessages = Object.values(result.errors).join('\n');
            Alert.alert('Sign In Failed', errorMessages);
        }
    };

    const toggleMode = () => {
        setIsAdminMode(!isAdminMode);
        setFormData({
            name: '',
            rollNumber: '',
            branch: '',
            year: '',
        });
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            accessibilityLabel="auth-screen"
        >
            <View style={styles.header}>
                <Text style={styles.title}>CampusHub Events</Text>
                <Text style={styles.subtitle}>
                    {isAdminMode ? 'Admin Login' : 'Student Login'}
                </Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Name *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        value={formData.name}
                        onChangeText={(value) => handleInputChange('name', value)}
                        autoCapitalize="words"
                    />
                </View>

                {!isAdminMode && (
                    <>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Roll Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g., 2021CS001"
                                value={formData.rollNumber}
                                onChangeText={(value) => handleInputChange('rollNumber', value)}
                                autoCapitalize="characters"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Branch</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g., Computer Science"
                                value={formData.branch}
                                onChangeText={(value) => handleInputChange('branch', value)}
                                autoCapitalize="words"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Year</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g., 1, 2, 3, or 4"
                                value={formData.year}
                                onChangeText={(value) => handleInputChange('year', value)}
                                keyboardType="number-pad"
                                maxLength={1}
                            />
                        </View>
                    </>
                )}

                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={handleSignIn}
                    activeOpacity={0.8}
                >
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={toggleMode}
                    activeOpacity={0.7}
                >
                    <Text style={styles.toggleButtonText}>
                        {isAdminMode
                            ? 'Switch to Student Login'
                            : 'Switch to Admin Login'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    {isAdminMode
                        ? 'Admin access for event management'
                        : 'Students can browse and register for events'}
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    contentContainer: {
        padding: 20,
        paddingTop: 60,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
    },
    form: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    signInButton: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    toggleButton: {
        marginTop: 16,
        padding: 12,
        alignItems: 'center',
    },
    toggleButtonText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '500',
    },
    footer: {
        marginTop: 30,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
});

export default AuthScreen;
