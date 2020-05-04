import React, { useState, useContext, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Image, Animated, ImageBackground, ActivityIndicator } from "react-native";
import Input from '../components/Input';
import Heading from '../components/Heading'
import Error from '../components/Error';
import LoginScreenRegButton from "./LoginScreenRegButton";
import QuickHomeButton from './QuickHomeButton'
import {Context} from '../actions/Store'
import * as ImagePicker from 'expo-image-picker';
import { FlatList } from "react-native-gesture-handler";
import { Icon } from 'native-base'
const defListImg = 'https://lh3.googleusercontent.com/proxy/6V7nJRhu-qKZ4cgvQAxcK54gR5bB9YF3de78YP2q4U_fTugh7PU3dSi9GGnIG6hg3dQ04L8fpIdxZpERzAwhdze8eS-iTW_aPPxOfnnQRIrNoNdxq3EAHV4HetrBkgy0rQrcEbheGLmcbwxdeS-T2bAkF8nuJjplMsbZ7q6XXJFx'


const NewListingForm = ({ navigation, submitListing }) => {
    const [state, dispatch] = useContext(Context)
    const [loading, setLoading] = useState(false)

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [regionalState, setRegionalState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [price, setPrice] = useState("");
    const [features, setFeatures] = useState("");
    const [bed, setBed] = useState("");
    const [bath, setBath] = useState("");
    const [sqr_foot, setSqr_foot] = useState("");
    const [default_image, setDefault_image] = useState("");
    const [p_contact, setP_contact] = useState("");
    const [imageArray, setImageArray] = useState([]);

    // const onChangeAddress = addressValue => setAddress(addressValue)

    const newListing = {
        address: address,
        city: city,
        state: regionalState,
        zipcode: zipcode,
        neighborhood: neighborhood,
        price: price,
        features: features,
        bed: bed,
        bath: bath,
        sqr_foot: sqr_foot,
        default_image: default_image ? [default_image] : [defListImg],
        p_contact: p_contact,
        owner_id: state.currentUser.id,
        images: imageArray.map(i => {return (i.base64)})
    }

    const handleAddPhotos = () => {
        ImagePicker.getCameraRollPermissionsAsync()
        if (imageArray.length === 0) { 
            ImagePicker.launchImageLibraryAsync({base64: true}).then(img => !img.cancelled && setImageArray([img]))
        }else{
            ImagePicker.launchImageLibraryAsync({base64: true}).then(img => !img.cancelled && setImageArray(prevState => ([img, ...prevState])))
        }
    }

    const handleCamera = () => {
        ImagePicker.getCameraPermissionsAsync()
        ImagePicker.launchCameraAsync({base64: true}).then(img => setImageArray(prevState => ([img, ...prevState])))
    }

    return (
        <>
        <KeyboardAvoidingView behavior="padding">
            {imageArray.length > 0 &&
            <ScrollView horizontal pagingEnabled>
                {imageArray.map((i, index) => {
                    return (
                        <Image
                        key={index}
                        style={styles.image}
                        source={{ uri: i.uri }}
                    />    
                )})}
            </ScrollView>
            }

            <ScrollView contentContainerStyle={{paddingBottom: 150}}>
                <View style={styles.container}>
                    <Heading style={styles.title}>Submit Your Listing</Heading>
                    <Error error={" "} />
                <View style={styles.uploadIcons} >
                    <TouchableOpacity onPress={handleAddPhotos} style={{paddingRight: 50}}>
                        <Icon type="Entypo" name="image" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCamera}>
                        <Icon type="Entypo" name="camera"/>
                    </TouchableOpacity>
                </View>
                <Input 
                    placeholder="Address" 
                    style={styles.input} 
                    onChangeText={(text) => setAddress(text)} value={address}
                />
                <Input 
                    placeholder="City" 
                    style={styles.input} 
                    onChangeText={(text) => setCity(text)} value={city}
                />
                <Input 
                    placeholder="State" 
                    style={styles.input} 
                    onChangeText={(text) => setRegionalState(text)} value={regionalState}
                />
                <Input 
                    placeholder="Zipcode" 
                    style={styles.input} 
                    onChangeText={(text) => setZipcode(text)} value={zipcode}
                />
                <Input 
                    placeholder="Neighborhood" 
                    style={styles.input} 
                    onChangeText={(text) => setNeighborhood(text)} value={neighborhood}
                />
                <Input 
                    placeholder="Price" 
                    style={styles.input} 
                    onChangeText={(text) => setPrice(text)} value={price}
                />
                <Input 
                    placeholder="Features" 
                    style={styles.input} 
                    onChangeText={(text) => setFeatures(text)} value={features}
                />
                <Input 
                    placeholder="Bed" 
                    style={styles.input} 
                    onChangeText={(text) => setBed(text)} value={bed}            
                />
                <Input 
                    placeholder="Bath" 
                    style={styles.input} 
                    onChangeText={(text) => setBath(text)} value={bath}
                />
                <Input 
                    placeholder="Square Footage" 
                    style={styles.input} 
                    onChangeText={(text) => setSqr_foot(text)} value={sqr_foot}
                />
                <Input 
                    placeholder="Insert one default image link" 
                    style={styles.input} 
                    onChangeText={(text) => setDefault_image(text)} value={default_image}
                />
                <Input 
                    placeholder="Contact Phone Number" 
                    style={styles.input} 
                    onChangeText={(text) => setP_contact(text)} value={p_contact}
                />
                </View>
                <View style={styles.btnContainer}>
                    <LoginScreenRegButton 
                        title={"Submit Listing"} 
                        style={styles.submitButton} 
                        onPress={() => {submitListing(newListing); setLoading(!loading)}}
                    />
                    {loading && <ActivityIndicator style={{padding:10}}/>}
                    <QuickHomeButton title={"Go Back"} onPress={() => {navigation.goBack()}}/>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        </>
    );
}
export default NewListingForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: "center"
      },
      uploadIcons: {
        flexDirection: 'row', 
        marginHorizontal: 10, 
        justifyContent: 'space-evenly'
      },
    btnContainer: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        justifyContent: "center"
      },
      btn: {
        backgroundColor: "saddlebrown",
        width: "100%",
        alignItems: 'center',
        justifyContent: "center",
        padding: 30,
        borderRadius: 10
      },
      text: {
          fontSize: 20,
          fontWeight: '700',
          color: 'white'
      },
      input: {
          marginVertical: 10
      },
      submitButton: {
          marginBottom: 10
      },
      image: {
          width: 100, 
          height: 100
      },
      speacialIn: {
        backgroundColor: "lightgrey",
        width: '100%',
        padding: 15,
        borderRadius: 10
          },
});
