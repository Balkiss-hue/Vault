import { StyleSheet } from "react-native";

const styles: any = StyleSheet.create({
	container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEEEE', 
      },
  btn: {
    backgroundColor: "#263238",
    alignItems: "center",
    marginTop:10,
    marginBottom:5
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    
  },
  input: {
    //color: "white"
    marginBottom:5,
    borderBottomWidth:2
  },
  linkTxt: {
    color: "#424242",
    fontSize: 12,
    textAlign: "center"
  }
});
export default styles;
