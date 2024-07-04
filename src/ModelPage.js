import React, { useRef, useState, memo } from 'react';
import { Grid, IconButton, useTheme } from '@mui/material';
import { Environment, useGLTF, OrbitControls, PerspectiveCamera, OrthographicCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import * as CreateJs from 'createjs-module';
import { IconLetterX, IconLetterY, IconLetterZ, IconNumber0, IconRefresh } from '@tabler/icons';
import { isMobile } from 'react-device-detect';

function ModelGlb(props) {
    const { float } = props;
    let { scene } = useGLTF('/3DModels/Living_room.glb');
    scene = scene.clone(true);
    scene.scale.set(2.2, 2.2, 2.2);
    scene.rotateY(-Math.PI * 0.23);
    const initialY = isMobile ? -5 : -3;
    scene.position.y = initialY;

    useFrame((e) => {
        if (float) {
            const time = e.clock.elapsedTime;
            scene.position.y = initialY + Math.cos(time);
        }
    });

    return <primitive object={scene} />;
}

const modelView = {
    initial: { x: 0, y: 10, z: 20 },
    x: { x: -22, y: 0, z: 0 },
    y: { x: 23, y: 0, z: 0 },
    z: { x: 0.01, y: 20, z: 0 }
};

const OrientationButton = (props) => {
    const theme = useTheme();
    const { selected, onClick, icon } = props;
    const style = selected
        ? {
              backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
              '&:hover': {
                  background: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
                  color: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main
              }
          }
        : {
              backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
              '&:hover': {
                  background: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
                  color: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
              }
          };
    return (
        <IconButton
            sx={style}
            size="small"
            onClick={() => {
                onClick();
            }}
        >
            {icon}
        </IconButton>
    );
};

const ModelPage = () => {
    const [ortho, setOrtho] = useState(false);
    const cameraOrtho = useRef();
    const cameraPerspective = useRef();
    const theme = useTheme();

    const [cursor, setCursor] = useState('grab');
    const [orientation, setOrientation] = useState('initial');
    const [selectedOrientation, setSelectedOrientation] = useState(null);
    const view = modelView[orientation];
    const [float, setFloat] = useState(true);

    const resetCamera = () => {
        const duration = 500;
        CreateJs.Ticker.framerate = 60;
        if (!cameraPerspective.current) {
            return;
        }
        if (ortho) {
            CreateJs.Tween.get(cameraOrtho.current.position).to(modelView.initial, duration);
            CreateJs.Tween.get(cameraOrtho.current).to({ zoom: isMobile ? 22 : 39 }, duration);
        } else {
            CreateJs.Tween.get(cameraPerspective.current.position).to(modelView.initial, duration);
            CreateJs.Tween.get(cameraPerspective.current).to({ zoom: 1.0 }, duration);
        }
    };

    return (
        <Grid container direction={isMobile ? 'row' : 'row-reverse'} justifyContent="center" alignItems="center">
            <Grid item container direction={isMobile ? 'row' : 'column'} justifyContent="center" alignItems="center" xs="auto" spacing={2}>
                <Grid item container direction={isMobile ? 'row' : 'column'} justifyContent="center" alignItems="center" xs="auto" spacing={1}>
                    <Grid item>
                        <OrientationButton
                            selected={selectedOrientation === 'initial'}
                            onClick={() => {
                                setOrientation('initial');
                                setSelectedOrientation('initial');
                                setOrtho(true);
                                setFloat(false);
                            }}
                            icon={<IconNumber0 stroke={2} size="1.3rem" color="#fff" />}
                        />
                    </Grid>
                    <Grid item>
                        <OrientationButton
                            selected={selectedOrientation === 'x'}
                            onClick={() => {
                                setOrientation('x');
                                setSelectedOrientation('x');
                                setOrtho(true);
                                setFloat(false);
                            }}
                            icon={<IconLetterX stroke={2} size="1.3rem" color="#fff" />}
                        />
                    </Grid>
                    <Grid item>
                        <OrientationButton
                            selected={selectedOrientation === 'y'}
                            onClick={() => {
                                setOrientation('y');
                                setSelectedOrientation('y');
                                setOrtho(true);
                                setFloat(false);
                            }}
                            icon={<IconLetterY stroke={2} size="1.3rem" color="#fff" />}
                        />
                    </Grid>
                    <Grid item>
                        <OrientationButton
                            selected={selectedOrientation === 'z'}
                            onClick={() => {
                                setOrientation('z');
                                setSelectedOrientation('z');
                                setOrtho(true);
                                setFloat(false);
                            }}
                            icon={<IconLetterZ stroke={2} size="1.3rem" color="#fff" />}
                        />
                    </Grid>
                    <Grid item>
                        <IconButton
                            sx={{
                                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
                                '&:hover': {
                                    background: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
                                    color: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
                                }
                            }}
                            size="small"
                            onClick={() => {
                                resetCamera();
                                setSelectedOrientation(null);
                            }}
                        >
                            <IconRefresh stroke={2} size="1.3rem" color="#fff" />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item container direction={isMobile ? 'row' : 'column'} justifyContent="center" alignItems="center" xs="auto">
                    <Grid item>
                        <PerspectiveSwitch
                            checked={ortho}
                            onChange={() => {
                                setOrtho((o) => !o);
                                setSelectedOrientation(null);
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <FlowSwitch
                            checked={float}
                            onChange={() => {
                                setFloat((f) => !f);
                                setSelectedOrientation(null);
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sx={{ aspectRatio: '1' }} xs>
                <Canvas
                    onPointerDown={() => {
                        setCursor('grabbing');
                        setSelectedOrientation(null);
                    }}
                    onPointerUp={() => {
                        setCursor('grab');
                    }}
                    style={{ cursor: cursor }}
                >
                    <OrthographicCamera
                        position={[view.x, view.y, view.z]}
                        zoom={isMobile ? 22 : 39}
                        makeDefault={ortho}
                        ref={cameraOrtho}
                    />
                    <PerspectiveCamera position={[view.x, view.y, view.z]} fov={45} makeDefault={!ortho} ref={cameraPerspective} />

                    <OrbitControls
                        minAzimuthAngle={-Math.PI * 0.23}
                        maxAzimuthAngle={Math.PI * 0.27}
                        maxPolarAngle={Math.PI * 0.5}
                        minPolarAngle={0}
                    />
                    <ModelGlb float={float} />
                    <Environment path="/3DModels/" files="venice_sunset_1k.hdr" />
                </Canvas>
            </Grid>
        </Grid>
    );
};

export default memo(ModelPage);
