import { useGLTF } from "@react-three/drei";

// Os modelos usam compressão Draco; o decoder é servido pelo próprio site
useGLTF.setDecoderPath("/draco/");
