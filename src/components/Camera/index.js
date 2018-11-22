/* @flow */
import { View, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import {
  Button,
  Text,
  Container,
  Icon,
  Content,
  Col,
  Grid,
  Footer,
} from 'native-base';
import React from 'react';
import { Camera as RNCamera, Permissions } from 'expo';
import { uploadDocument } from '../../redux/modules/documents/actions';

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

type Props = { uploadDocument: Function }
type State = { permissionsGranted: boolean, photo: ?Object }

class Camera extends React.Component<Props, State> {
  camera = null

  constructor(props: Props) {
    super(props);
    this.state = {
      permissionsGranted: false,
      photo: null,
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
  }

  shoot = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync();
      this.setState({ photo });
    }
  };

  removePhoto = () => {
    this.setState({ photo: null });
  }

  sendPhoto = () =>
    this.props.uploadDocument(this.state.photo);

  render() {
    const { permissionsGranted, photo } = this.state;
    return permissionsGranted
      ? (
        <Container>
          {photo
            ? (
              <View style={{ flex: 1 }}>
                <ImageBackground
                  style={{ flex: 1 }}
                  source={{ uri: photo.uri }}
                >
                  <Content />
                  <Footer style={{ backgroundColor: 'transparent' }}>
                    <Grid>
                      <Col style={{ width: '50%' }}>
                        <Button full rounded onPress={this.removePhoto}>
                          <Icon name="trash" />
                          <Text style={{ textAlign: 'left' }}>
                            Take again
                          </Text>
                        </Button>
                      </Col>
                      <Col style={{ width: '50%' }}>
                        <Button full rounded onPress={this.sendPhoto}>
                          <Icon name="md-send" />
                          <Text style={{ textAlign: 'left' }}>
                            Send
                          </Text>
                        </Button>
                      </Col>
                    </Grid>
                  </Footer>
                </ImageBackground>
              </View>
            )
            : (
              <View style={{ flex: 1 }}>
                <RNCamera
                  style={styles.camera}
                  type={RNCamera.Constants.Type.back}
                  permissionDialogMessage="Ukážeš mi jí?"
                  ref={(ref) => { this.camera = ref; }}
                />
                <Button full onPress={this.shoot}>
                  <Icon name="camera" />
                  <Text>
                    Take a photo
                  </Text>
                </Button>
              </View>
            )}
        </Container>
      )
      : <Text>Nemáš mandát kundo</Text>;
  }
}

const mapDispatchToProps = dispatch => ({
  uploadDocument: (...args) => dispatch(uploadDocument(...args)),
});

export default connect(null, mapDispatchToProps)(Camera);
