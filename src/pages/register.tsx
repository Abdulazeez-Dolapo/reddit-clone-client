import React from "react"
import { Formik, Form } from "formik"
import { Box, Button } from "@chakra-ui/react"
import { useRouter } from "next/router"

import Wrapper from "../components/Wrapper"
import { InputField } from "../components/InputField"

import { useRegisterMutation } from "../generated/graphql"

import { toErrorMap } from "../utils/toErrorMap"

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
	const [, register] = useRegisterMutation()

	const router = useRouter()

	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ username: "", password: "" }}
				onSubmit={async (values, { setErrors }) => {
					const response = await register(values)

					if (response.data?.register.errors) {
						setErrors(toErrorMap(response.data.register.errors))
					} else if (response.data?.register.user) {
						router.push("/")
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<InputField
							name="username"
							placeholder="username"
							label="Username"
						/>

						<Box mt={4}>
							<InputField
								name="password"
								placeholder="password"
								type="password"
								label="Password"
							/>
						</Box>

						<Button
							mt={4}
							colorScheme="teal"
							type="submit"
							isLoading={isSubmitting}
						>
							Register
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	)
}

export default Register
