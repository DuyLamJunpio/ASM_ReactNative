import { StyleSheet } from 'react-native';

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
  },
  noidung_dialog: {
    marginLeft:40,
    marginTop:150,
    borderRadius:15,
    paddingVertical:20,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#EDE7DC',
    borderWidth: 1,
    borderColor:'lightgray',
    height: 'auto',
    width: '80%'
  },
  content: {
    borderRadius:15,
    width:'90%',
    borderWidth: 1,
    height: 'auto',
    borderColor:'lightgray',
    backgroundColor: '#fff',
    padding: 10,
    margin: 10
  },
  input: {
    fontSize: 18
  },
  add: {
    width: 200,
    height: 50,
  },
  icon: {
    flex:1,
    backgroundColor: '#EF7C8E',
    textAlign: 'center',
    lineHeight: 50,
    color: 'white',
    borderRadius: 15,
    fontSize: 27,
    fontWeight: '600',
  },
  avt:{
    borderRadius:40,
    width:150,
    height:150
  }
});

export default styles2;
