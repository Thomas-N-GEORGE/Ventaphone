// Our conversation and message page.

import React, { useState, useRef, useContext } from "react";
import {
  Image,
  Text,
  StatusBar,
  TextInput,
  Button,
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { CurrentUserContext, User } from "../utils/user-class";

export default Login = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const emailInput = useRef(null);
  const [email, setEmail] = useState("");
  const passwordInput = useRef(null);
  const [password, setPassword] = useState("");

  const submit = () => {
    emailInput.current.blur();
    passwordInput.current.blur();
    // Create user
    const user = new User();
    user.email = email;
    user.password = password;


    // Make API calls to populate user fields.
    user.apiLoginUser(function (result) {
      // The result of connection guides our next step :
      if (result) {
        // console.log("result from Login : ", result);
        // console.log("and user from Login : ", user);
        setCurrentUser(user);
        // Route to home.
        navigation.navigate("Home");
      } else {
        setCurrentUser(null);
      }
    });
  };

  return (
    <ScrollView>
      <StatusBar style="auto" />
      <View style={[styles.container, {paddingVertical: 25}]}>
        <Text style={styles.title}>Se connecter</Text>
      </View>
      <View style={[styles.container, {flex: 2,}]}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView behavior="padding" style={styles.form}>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            ref={emailInput}
            placeholder="email@example.com"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordInput.current.focus()}
            blurOnSubmit={false}
          />
          <Text>Mot de passe</Text>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            value={password}
            onChangeText={(text) => setPassword(text)}
            ref={passwordInput}
            secureTextEntry={true}
            onSubmitEditing={submit}
          />
          <View >
            <Pressable onPress={submit}>
              <Text style={[styles.button, {marginTop: 20, marginBottom: 50}]}>SE CONNECTER</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
  },

  description: {
    // fontSize: 14,
    // color: "white",
  },
  input: {
    margin: 20,
    // marginBottom: 0,
    marginTop: 5,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 16,
    width: 200,
  },
  passwordInput: {},
  form: {
    // flex: 1,
    // justifyContent: "space-between",
  },
  button: {
    height: 40,
    backgroundColor: "#3a5fa4",
    color: "white",
    fontSize: 17,
    textAlign: "center",
    textAlignVertical : "center",
    borderRadius: 20,
  },
});
