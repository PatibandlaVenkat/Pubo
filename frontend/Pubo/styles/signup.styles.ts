import { StyleSheet } from "react-native";


export const createStyles =(colors: any,isDarkMode:boolean) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
    backgroundColor:colors.authbackground,
  },
  maincontainer:{
    paddingTop:0,
    padding:10,
    marginTop:125,
    backgroundColor:colors.authmaincont,
    borderWidth:1,
    borderRadius:24,
    borderColor:colors.border,
  },
  title: {
    paddingTop: 40,
    marginBottom: 8,
    fontSize: 30,
    textAlign: 'center',
    fontWeight:'600',
    color:colors.text,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.8,
  },
  label: {
    fontWeight: '600',
    fontSize: 15,
    paddingBottom:5,
    color:colors.textMuted,
  },
  input: {
    borderWidth: 1,
    borderColor:colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor:colors.backGround,
    color:colors.text,
  },
  button: {
    backgroundColor:colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color:colors.text,
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 12,
    alignItems: 'center',
  },
  errorBox: {
    backgroundColor: '#FEE2E2', // Light red background
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EF4444', // Red border
    marginBottom: 16,
},
errorText: {
    color: '#B91C1C', // Dark red text
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
},
inputview:{
  paddingBottom:7,
}

})