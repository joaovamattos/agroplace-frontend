export default {
    palette: {
        primary: {
          light: '#31E981',
          main: '#20CE6C',
          dark: '#149B50',
          contrastText: '#fff'
        },
        secondary: {
          light: '#ef5350',
          main: '#f44336',
          dark: '#e53935',
          contrastText: '#fff'
        }
      },

    spreadThis: {
        typography: {
            useNextVariants: true
        },
        form: {
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center'
        },
        image: {
            margin: '20px auto'
        },
        pageTitle: {
            margin: '10px auto'
        },
        textField: {
            margin: '10px auto'
        },
        button: {
            marginTop: 20,
            marginBottom: 10,
            position: 'relative'
        },
        customError: {
            color: 'red',
            fontSize: '0.8rem',
            marginTop: 10
        },
        progress: {
            position: 'absolute'
        },
        paper: {
            padding: 20,
            paddingBottom: 60,
            margin: '0 auto'
          },
        profile: {
        "& .image-wrapper": {
            textAlign: "center",
            position: "relative",
            maxWidth: 230,
            margin: '0 auto',
            "& button": {
            position: "absolute",
            top: "80%",
            right: 0
            }
        },
        "& .profile-image": {
            width: 200,
            height: 200,
            objectFit: "cover",
            backgroundSize: "cover",
            maxWidth: "100%",
            borderRadius: "50%"
        },
        "& .profile-details": {
            textAlign: "center",
            "& span, svg": {
            verticalAlign: "middle"
            },
            "& a": {
            color: '#20CE6C'
            }
        },
        "& hr": {
            border: "none",
            margin: "0 0 10px 0"
        },
        "& svg.button": {
            "&:hover": {
            cursor: "pointer"
            }
        }
        },
        buttons: {
        textAlign: "center",
        "& a": {
            margin: "20px 10px"
        }
        }
    }
}