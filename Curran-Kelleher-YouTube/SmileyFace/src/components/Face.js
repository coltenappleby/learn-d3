import { FaceContainer } from "./FaceContainer"
import { Eyes } from "./Eyes"
import { Mouth } from "./Mouth"
import { BackgroundCircle } from "./BackgroundCircle"

export const Face = ({
    width, 
    height, 
    centerX, 
    centerY, 
    strokeWidth, 
    eyeOffsetX, 
    eyeOffsetY, 
    eyeRadius,
    mouthRadius,
    mouthWidth
  }) => (
    <FaceContainer width={width} height={height} centerX={centerX} centerY={centerY}>
        <BackgroundCircle 
        radius={centerY - strokeWidth/2} 
        color ={'yellow'} 
        strokeWidth={strokeWidth}/>
        <Eyes 
        eyeOffsetX={eyeOffsetX} 
        eyeOffsetY={eyeOffsetY} 
        eyeRadius={eyeRadius}/>
        <Mouth 
        mouthRadius={mouthRadius} 
        mouthWidth={mouthWidth}/>
  </FaceContainer>  
  )