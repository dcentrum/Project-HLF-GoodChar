<View style={Styles.container}>
	<ScrollView contentContainerStyle={{ flex: 1 }}>
		<View style={Styles.container}>
			<View style={Styles.container}>
				{this.state.recording && (
					<View style={{ flex: 1 }}>
						<QRCodeScanner onRead={e => this.setState({ qr_code_result: e.data, recording: false })} />
						<View
							style={{
								backgroundColor: 'transparent',
								height: 30,
								position: 'absolute',
								right: 4,
								top: 4,
							}}
						>
							<TouchableWithoutFeedback onPress={() => this.setState({ recording: false })}>
								<Icon name="window-close" type="font-awesome" size={32} color="#aaa" />
							</TouchableWithoutFeedback>
						</View>
					</View>
				)}
				{!this.state.recording && (
					<View style={Styles.container}>
						<UserInput
							placeHolder="Enter Volunteer Name"
							autoCapitalize="words"
							onChangeText={this.handleVolunteerName}
							item={this.state.volunteer.name}
						/>
						<View style={{ paddingHorizontal: 16 }}>
							<Dropdown
								label="Select Camp Name"
								data={data}
								onChangeText={value => this.handleProjectName(value)}
							/>
						</View>
						<UserInput
							placeHolder="Project Name"
							autoCapitalize="words"
							editable={false}
							item={this.state.project}
						/>
						<UserInput
							placeHolder="Enter Donee Name"
							autoCapitalize="words"
							onChangeText={this.handleDoneeName}
						/>
					</View>
				)}
			</View>

			<View
				style={{
					paddingHorizontal: 16,
					justifyContent: 'space-around',
					alignItems: 'center',
				}}
			>
				<Button label="Donation Asset" onPress={this.handleDonationAsset} right={right} />
				{this.state.qr_code_result.length > 0 && (
					<View>
						<Text
							style={{
								paddingHorizontal: 16,
								fontSize: 16,
								fontWeight: '600',
								color: '#333333',
							}}
							numberOfLines={2}
							ellipsizeMode="tail"
						>
							{this.state.qr_code_result}
						</Text>
					</View>
				)}
			</View>

			<TouchableWithoutFeedback
				onPress={() => {
					this.setState({ playing: !this.state.playing }, () => {
						if (this.state.playing) {
							this.whoosh.play(success => this.setState({ playing: false }));
						} else {
							this.whoosh.stop();
						}
					});
				}}
			>
				<View
					style={{
						backgroundColor: '#7D4976',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						height: 50,
						marginTop: 16,
						paddingHorizontal: 16,
						borderBottomWidth: StyleSheet.hairlineWidth,
						borderBottomColor: '#333333',
					}}
				>
					<Icon
						name={this.state.playing ? 'pause-circle' : 'play-circle'}
						type="font-awesome"
						size={32}
						color="#fff"
					/>
					<Text style={{ color: '#fff', fontSize: 20, fontWeight: '500', flex: 1, marginLeft: 24 }}>
						Announcement from GoodChar
					</Text>
				</View>
			</TouchableWithoutFeedback>
			<View
				style={{
					justifyContent: 'space-evenly',
					alignItems: 'center',
					backgroundColor: '#fff',
				}}
			>
				<TouchableWithoutFeedback
					onLongPress={() => {
						FingerprintScanner.isSensorAvailable()
							.then(biometryType => {
								console.log('sensor available  press');
								FingerprintScanner.authenticate({
									description: 'Scan your fingerprint on the device scanner to continue',
								})
									.then(() => {
										Alert.alert('Authenticated successfully');
									})
									.catch(error => {
										Alert.alert('Authenticated failed');
									});
							})
							.catch(error => console.log('sensor error'));
						console.log('onlong press');
					}}
				>
					<Icon name="fingerprint" type="material-community" color="#333333" size={100} />
				</TouchableWithoutFeedback>
				<Button label="Complete Donation" onPress={this.handleCompleteDonation} />
			</View>
		</View>
	</ScrollView>
</View>;
